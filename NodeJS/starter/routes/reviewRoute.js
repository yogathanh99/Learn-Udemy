const express = require('express');
const reviewControllers = require('../controllers/reviewControllers');
const authControllers = require('../controllers/authControllers');

const router = express.Router({ mergeParams: true });

router.use(authControllers.protectData);

router
  .route('/')
  .get(reviewControllers.getAllReviews)
  .post(
    authControllers.restrictTo('admin', 'user'),
    reviewControllers.setTourReviewId,
    reviewControllers.createReview
  );

router
  .route('/:id')
  .get(reviewControllers.getReview)
  .delete(
    authControllers.restrictTo('admin', 'user'),
    reviewControllers.deleteReview
  )
  .patch(
    authControllers.restrictTo('admin', 'user'),
    reviewControllers.updateReview
  );

module.exports = router;
