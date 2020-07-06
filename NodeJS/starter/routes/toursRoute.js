const express = require('express');

const toursControllers = require('../controllers/toursControllers');
const authControllers = require('../controllers/authControllers');
const reviewRoute = require('./reviewRoute');

const router = express.Router();

//Get all tours and Create a new tour
router
  .route('/')
  .get(toursControllers.getAllTours)
  .post(
    authControllers.protectData,
    authControllers.restrictTo('admin', 'lead-guide', 'guide'),
    toursControllers.createTour
  );

//Get a tour, update, and delete a tour
router
  .route('/:id')
  .get(toursControllers.getTour)
  .patch(
    authControllers.protectData,
    authControllers.restrictTo('admin', 'lead-guide'),
    toursControllers.updateTour
  )
  .delete(
    authControllers.protectData,
    authControllers.restrictTo('admin', 'lead-guide'),
    toursControllers.deleteTour
  );

//Get tour stats
router.route('/tour-stats').get(toursControllers.getTourStats);

//Get monthly plan
router
  .route('/monthly-plan/:year')
  .get(
    authControllers.protectData,
    authControllers.restrictTo('admin', 'lead-guide', 'guide'),
    toursControllers.getMonthlyPlan
  );

//Get 5 tours cheapest
router
  .route('/top-5-cheapest')
  .get(toursControllers.aliasTopCheap, toursControllers.getAllTours);

/**
 * POST /tour/123213/reviews -> Create a review from a tour
 * GET /tour/12312/reviews -> Get all reviews of a tour
 * GET /tour/32132/reviews/21312 -> Get a review of a tour
 */
router.use('/:tourId/reviews', reviewRoute);

router
  .route('/tours-within/:distance/center/:latlng/unit/:unit')
  .get(toursControllers.getTourWithinRadius);

route.route('/distance/:latlng/unit/:unit').get(toursControllers.getDistance);

module.exports = router;
