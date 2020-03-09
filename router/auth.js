// Routes to authenticate users
// Import express
const express = require('express');
// Define Router express
const router = express.Router();
// Import express-valodator
const { check } = require('express-validator');
// Imports Controllers
const authController = require('../controllers/authController')


// Cretate one user
// api/auth
router.post('/',
  // Our validations
  [
    check('email', 'Enter a valid email').isEmail(),
    check('password', 'The password must have a minimum of 6 characters').isLength({ min: 6 })
  ],
  authController.authenticateUser
);

module.exports  = router