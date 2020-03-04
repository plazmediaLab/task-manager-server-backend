// Routes to create users
// Import express
const express = require('express');
// Define Router express
const router = express.Router();
// Imports Controllers
const userController = require('../controllers/userController')


// Cretate one user
// api/users
router.post('/',
  userController.createUser
);

module.exports  = router