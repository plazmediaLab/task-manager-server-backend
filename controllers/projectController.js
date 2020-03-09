const Project = require('../models/Project');
// Import the validation result
const { validationResult } = require('express-validator');

exports.createProject = async (req, res) => {

  // Check for errors
  const errors = validationResult(req);
  if( !errors.isEmpty() ){
    return res.status(400).json({ errors: errors.array() });
  }
  
  try {
    
    // Create new project
    const project = new Project(req.body);

    // Save the creator of the project via JWT
    project.creator = req.user.id;

    // Save project
    project.save();
    res.json(project);

  } catch (error) {

    console.log(error);
    res.status(500).send('There was a mistake...');

  }

}

// Get all projects of the actual user
exports.getProjects = async (req, res) => {

  try {

    const projects = await Project.find({ creator: req.user.id }).sort({ creating: -1 });
    res.json({ projects });

  } catch (error) {

    console.log(error)
    res.status(500).send('There was a mistake ...');

  }

}

// Update project
exports.updateProjects = async (req, res) => {

  // Check for errors
  const errors = validationResult(req);
  if( !errors.isEmpty() ){
    return res.status(400).json({ errors: errors.array() });
  }

  // Extract project info
  const { nameProject } = req.body;
  const newProject = {}

  if(nameProject){
    newProject.nameProject = nameProject
  }

  try {
    
    // Check ID
    let project = await Project.findById(req.params.id);

    // If project exist or no
    if( !project ){
      return res.status(404).json({ msn: 'Project not found' });
    }

    // Verify the project creator
    if(project.creator.toString() !== req.user.id){
      return res.status(401).json({ msn: 'Not autorized' });
    }

    // UPDATE
    project = await Project.findByIdAndUpdate({ _id: req.params.id }, { $set: newProject }, { new: true });

    res.json({ project })

  } catch (error) {
    console.log(error)
    res.status(500).send('Server error ...');
  }
}

// Delete one project
exports.deleteProjects = async (req, res) => {

  try {
    
    // Check ID
    let project = await Project.findById(req.params.id);

    // If project exist or no
    if( !project ){
      return res.status(404).json({ msn: 'Project not found' });
    }

    // Verify the project creator
    if(project.creator.toString() !== req.user.id){
      return res.status(401).json({ msn: 'Not autorized' });
    }

    // DELETE
    await Project.findOneAndRemove({ _id : req.params.id });
    res.json({ msn: 'Project deleted successfully' })

  } catch (error) {
    
    console.log(error)
    res.status(500).send('Server error...');

  }

}