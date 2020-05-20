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
router.patch(
  '/updateData',
  authControllers.protectData,
  usersControllers.updateCurrentData
);
router.delete(
  '/deleteUser',
  authControllers.protectData,
  usersControllers.deleteCurrentUser
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
  .delete(
    authControllers.protectData,
    authControllers.restrictTo('admin', 'lead-guide'),
    usersControllers.deleteUser
  );

module.exports = router;
