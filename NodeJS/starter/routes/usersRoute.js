const express = require('express');
const usersControllers = require('../controllers/usersControllers');

const router = express.Router();

//Get all users and Create a new user
router
  .route('/')
  .get(usersControllers.getAllUsers)
  .post(usersControllers.createUser);
//Get a tour, update, and delete a tour
router
  .route('/:id')
  .get(usersControllers.getUser)
  .patch(usersControllers.updateUser)
  .delete(usersControllers.deleteUser);

module.exports = router;
