const express = require('express');
const reviewControllers = require('../controllers/reviewControllers');
const authControllers = require('../controllers/authControllers');

const router = express.Router({ mergeParams: true });

router
  .route('/')
  .get(reviewControllers.getAllReviews)
  .post(
    authControllers.protectData,
    authControllers.restrictTo('admin', 'user'),
    reviewControllers.createReview
  );

router.use(
  '/:id',
  authControllers.protectData,
  authControllers.restrictTo('admin', 'lead-guide', 'user'),
  reviewControllers.deleteReview
);

module.exports = router;
