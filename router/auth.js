// Routes to authenticate users
// Import express
const express = require('express');
// Define Router express
const router = express.Router();
// Import express-valodator
const { check } = require('express-validator');
// Imports Controllers
const authController = require('../controllers/authController');

const auth = require('../middleware/auth');


// Login
// api/auth
router.post('/',
  // Our validations
  authController.authenticateUser
);

// Get authenticated user
router.get('/',
  auth,
  authController.authUser
)

module.exports  = router