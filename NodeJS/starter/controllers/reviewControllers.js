const Review = require('../models/reviewModel');
// const tryCatchAsync = require('../utils/tryCatchAsync');
// const AppError = require('../utils/appError');
const factory = require('./handleFactory');

exports.getAllReviews = factory.getAll(Review);
exports.setTourReviewId = (req, res, next) => {
  // Allow nested route
  if (!req.body.tour) req.body.tour = req.params.tourId;
  if (!req.body.user) req.body.user = req.user.id;
  next();
};

exports.getReview = factory.getOne(Review);
exports.createReview = factory.createOne(Review);
exports.updateReview = factory.updateOne(Review);
exports.deleteReview = factory.deleteOne(Review);
