const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const tryCatchAsync = require('../utils/tryCatchAsync');
const AppError = require('../utils/appError');
const sendEmail = require('../utils/email');

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

exports.signUp = tryCatchAsync(async (req, res, next) => {
  const newUser = await User.create(req.body);

  const token = signToken(newUser._id);
  res.status(201).json({
    status: 'success',
    token,
    data: {
      user: newUser,
    },
  });
});

exports.logIn = tryCatchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return new AppError('Please provide an email and password', 400);
  }

  const user = await User.findOne({ email }).select('+password');
  const isCorrectPassword = await user.correctPassword(password, user.password);

  if (!user || !isCorrectPassword)
    return new AppError('Incorrect email or password', 401);

  const token = signToken(user._id);

  res.status(201).json({
    status: 'success',
    token,
  });
});

exports.protectData = tryCatchAsync(async (req, res, next) => {
  // Get token and check token
  const authorization = req.headers.authorization;
  let token = '';

  if (authorization && authorization.startsWith('Bearer'))
    token = authorization.split(' ')[1];

  if (!token) {
    return next(
      new AppError('You are not logged in! Please log in to get access', 401)
    );
  }

  // Verification your token
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  // Check if user still exists
  const freshUser = await User.findById(decoded.id);

  if (!freshUser) {
    return next(
      new AppError('The user belong to this token does no longer exist', 401)
    );
  }
  const isChangePasswordRecently = freshUser.changedPasswordAfter(decoded.iat);

  if (isChangePasswordRecently) {
    return next(
      new AppError('User recently changed password! Please log in again.', 401)
    );
  }

  // GRANT ACCESS TO PROTECTED ROUTE
  req.user = freshUser;
  next();
});

exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError('You do not have permission to perform this action', 403)
      );
    }
    next();
  };
};

exports.forgotPassword = tryCatchAsync(async (req, res, next) => {
  // Get user based on req.email
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return next(new AppError('There is not user with this email', 404));
  }

  // Generate random token
  const resetToken = user.createPasswordResetToken();
  await user.save({ validateBeforeSave: false });

  // Send it to user's email
  const resetURL = `${req.protocol}://${req.get(
    'host'
  )}/api/v1/users/resetPassword/${resetToken}`;

  const message = `Forgot your password? Submit a PATCH request with your new password and passwordConfirm to: ${resetURL}.\nIf you didn't forget your password, please ignore this email!`;

  try {
    await sendEmail({
      email: user.email,
      subject: 'Your password reset token (valid for 10 min)',
      message,
    });

    res.status(200).json({
      status: 'success',
      message: 'Token sent to email!',
    });
  } catch (err) {
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save({ validateBeforeSave: false });

    return next(
      new AppError('There was an error sending the email. Try again later!'),
      500
    );
  }
});

exports.resetPassword = (req, res, next) => {};
