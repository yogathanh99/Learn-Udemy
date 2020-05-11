const Review = require('../models/reviewModel');
const tryCatchAsync = require('../utils/tryCatchAsync');
const AppError = require('../utils/appError');

exports.getAllReviews = tryCatchAsync(async (req, res, next) => {
  const reviews = await Review.find();

  res.status(200).json({
    status: 'success',
    result: reviews.length,
    data: {
      reviews,
    },
  });
});

exports.createReview = tryCatchAsync(async (req, res, next) => {
  const newReview = await Review.create(req.body);
  res.status(201).json({
    status: 'success',
    data: {
      review: newReview,
    },
  });
});
