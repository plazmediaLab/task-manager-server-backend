// Routes to authenticate users
// Import express
const express = require('express');
// Define Router express
const router = express.Router();
// Imports Controllers
const taskController = require('../controllers/taskController')
// Imports Middleware
const auth = require('../middleware/auth');

const { check } = require('express-validator');

// Create new task
// api/task
router.post('/',

  auth,
  [
    check('nameTask', 'The name field is obligatory').not().isEmpty()
  ],
  taskController.createTask

);

// Get tasks for project
router.get('/',

  auth,
  taskController.getTasks

);

// Update task
router.put('/:id',

  auth,
  taskController.updateTask

);

// Delete task
router.delete('/:id',

  auth,
  taskController.deleteTask

);

module.exports  = router