const express = require('express');
const usersControllers = require('../controllers/usersControllers');
const authControllers = require('../controllers/authControllers');

const router = express.Router();

router.post('/signup', authControllers.signUp);
router.post('/login', authControllers.logIn);
router.post('/forgotPassword', authControllers.forgotPassword);
router.patch('/resetPassword/:token', authControllers.resetPassword);
router.patch(
  '/updatePassword',
  authControllers.protectData,
  authControllers.updatePassword
);

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
