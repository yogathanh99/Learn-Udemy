const express = require('express');
const toursControllers = require('../controllers/toursControllers');

const router = express.Router();

router.param('id', toursControllers.checkId);

//Get tour stats
router.route('/tour-stats').get(toursControllers.getTourStats);

//Get monthly plan
router.route('/monthly-plan/:year').get(toursControllers.getMonthlyPlan);

//Get 5 tours cheapest
router
  .route('/top-5-cheapest')
  .get(toursControllers.aliasTopCheap, toursControllers.getAllTours);

//Get all tours and Create a new tour
router
  .route('/')
  .get(toursControllers.getAllTours)
  .post(toursControllers.createTour);

//Get a tour, update, and delete a tour
router
  .route('/:id')
  .get(toursControllers.getTour)
  .patch(toursControllers.updateTour)
  .delete(toursControllers.deleteTour);

module.exports = router;
