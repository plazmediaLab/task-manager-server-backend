// Routes to authenticate users
// Import express
const express = require('express');
// Define Router express
const router = express.Router();
// Imports Controllers
const projectController = require('../controllers/projectController')
// Imports Middleware
const auth = require('../middleware/auth');

const { check } = require('express-validator');


// Cretate one user
// api/projects
router.post('/',
  auth,
  // Our validations
  [
    // OPTIMIZE ·  03/08/2020 
    check('nameProject', 'The name project is obligatory').not().isEmpty()
  ],
  projectController.createProject
);

// Get all projects
router.get('/',
  auth,
  projectController.getProjects
);

// Update project via ID
router.put('/:id',
  auth,
  // Our validations
  [
    check('nameProject', 'The name project is obligatory').not().isEmpty()
  ],
  projectController.updateProjects
) 

// Delete project
router.delete('/:id',
  auth,
  projectController.deleteProjects
) 

module.exports  = router