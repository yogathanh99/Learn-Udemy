const fs = require('fs');
const shortid = require('shortid');

const User = require('../models/userModel');
const tryCatchAsync = require('../utils/tryCatchAsync');

const users = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/users.json`)
);

exports.getAllUsers = tryCatchAsync(async (req, res, next) => {
  const users = await User.find();

  res.status(200).json({
    status: 'success',
    requestedAt: req.requestTime,
    result: users.length,
    data: {
      users,
    },
  });
});

exports.createUser = (req, res) => {
  const newId = shortid.generate();
  const newUser = Object.assign({ _id: newId }, req.body);

  users.push(newUser);

  fs.writeFile(
    `${__dirname}/../dev-data/data/users.json`,
    JSON.stringify(users),
    (err) => {
      res.status(201).json({
        status: 'success',
        result: users.length,
        data: {
          user: newUser,
        },
      });
    }
  );
};

exports.getUser = (req, res) => {
  const id = req.params.id * 1;
  const user = users.find((el) => el.id === id);

  if (user) {
    res.status(200).json({
      status: 'success',
      data: {
        user,
      },
    });
  } else {
    res.status(404).json({
      status: 'fail',
      message: 'Invalid Id',
    });
  }
};

exports.updateUser = (req, res) => {
  if (req.params.id * 1 > users.length) {
    res.status(404).json({
      status: 'fail',
      message: 'Invalid Id',
    });
  } else {
    res.status(200).json({
      status: 'success',
      data: {
        user: '<Update here...>',
      },
    });
  }
};

exports.deleteUser = (req, res) => {
  if (req.params.id * 1 > users.length) {
    res.status(404).json({
      status: 'fail',
      message: 'Invalid Id',
    });
  } else {
    res.status(204).json({
      status: 'success',
      data: null,
    });
  }
};
