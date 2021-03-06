// Routes to create users
// Import express
const express = require('express');
// Define Router express
const router = express.Router();
// Imports Controllers
const userController = require('../controllers/userController')
// Import express-valodator
const { check } = require('express-validator');


// Cretate one user
// api/users
router.post('/',
  // Our validations
  [
    check('name', 'The name field is required').not().isEmpty(),
    check('email', 'Enter a valid email').isEmail(),
    check('password', 'The password must have a minimum of 6 characters').isLength({ min: 6 })
  ],
  userController.createUser
);

module.exports  = router