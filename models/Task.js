const mongoose = require('mongoose');


const TaskSchema = mongoose.Schema({
  nameTask:{
    type: String,
    require: true,
    trim: true
  },
  state:{
    type: Boolean,
    default: false
  },
  created:{
    type: Date,
    default: Date.now()
  },
  project:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project'
  }
});

module.exports = mongoose.model('Task', TaskSchema); 