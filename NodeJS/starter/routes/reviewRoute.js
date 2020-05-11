const express = require('express');
const reviewControllers = require('../controllers/reviewControllers');
const authControllers = require('../controllers/authControllers');

const router = express.Router();

router
  .route('/')
  .get(reviewControllers.getAllReviews)
  .post(
    authControllers.protectData,
    authControllers.restrictTo('admin', 'user'),
    reviewControllers.createReview
  );

module.exports = router;
