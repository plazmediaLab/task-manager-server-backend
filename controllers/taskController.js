const Task = require('../models/Task');
const Project = require('../models/Project');
const { validationResult } = require('express-validator');

// Create new task
exports.createTask = async (req, res) => {

  // Check for errors
  const errors = validationResult(req);
  if( !errors.isEmpty() ){
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    
    // Extract the project and check if it exists
    const { project } = req.body;

    const existProject = await Project.findById(project);
    if( !existProject ){
      return res.status(404).json({ msn: 'Project no found...' });
    }

    // Check if the current project belongs to the autenticated user
    if(existProject.creator.toString() !== req.user.id){
      return res.status(401).json({ msn: 'Not autorized' });
    } 

    // CREATE Task
    const task = new Task(req.body);
    await task.save();
    res.json({ task });
    
  } catch (error) {
    
    console.log(error);
    res.status(500).send('There was a mistake...');

  }

}

// Get tasks for projects
exports.getTasks = async (req, res) => {

  try {
    
    // Extract the project and check if it exists
    const { project } = req.query;

    const existProject = await Project.findById(project);
    if( !existProject ){
      return res.status(404).json({ msn: 'Project no found...' });
    }

    // Check if the current project belongs to the autenticated user
    if(existProject.creator.toString() !== req.user.id){
      return res.status(401).json({ msn: 'Not autorized' });
    }

    // GET tasks
    const tasks = await Task.find({ project }).sort({ created: -1 });
    res.json({ tasks }) 
    
  } catch (error) {

    console.log(error);
    res.status(500).send('There was a mistake...');

  }

}

// Update task
exports.updateTask = async (req, res) => {

  try {
    
    // Extract the project and check if it exists
    const { project, nameTask, state } = req.body;

    // If task exist or not
    let task = await Task.findById(req.params.id);

    if(!task){
      return res.status(401).json({ msn: 'Task is not exist' });
    }

    // Extract project
    const existProject = await Project.findById(project);

    // Check if the current project belongs to the autenticated user
    if(existProject.creator.toString() !== req.user.id){
      return res.status(401).json({ msn: 'Not autorized' });
    }

    // Create object with the new information
    const newTask = {};

    newTask.nameTask = nameTask;
    newTask.state = state;


    // UPDATE task
    task = await Task.findOneAndUpdate({ _id : req.params.id }, newTask, { new: true })

    res.json({ task })
     
    
  } catch (error) {

    console.log(error);
    res.status(500).send('There was a mistake...');

  }

}

// Update task
exports.deleteTask = async (req, res) => {

  try {
    
    // Extract the project and check if it exists
    const { project } = req.query;
    // console.log(req.body);

    // If task exist or not
    let task = await Task.findById(req.params.id);

    if(!task){
      return res.status(401).json({ msn: 'Task is not exist' });
    }

    // Extract project
    const existProject = await Project.findById(project);

    // Check if the current project belongs to the autenticated user
    if(existProject.creator.toString() !== req.user.id){
      return res.status(401).json({ msn: 'Not autorized' });
    }

    // DELETE
    await Task.findByIdAndRemove({ _id : req.params.id });
    res.json({ msn: 'Task deleted successfully...' })
    
  } catch (error) {

    console.log(error);
    res.status(500).send('There was a mistake...');

  }

}