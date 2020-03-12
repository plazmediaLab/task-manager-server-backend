const User = require('../models/User');
const bcryptjs = require('bcryptjs')
// Import the validation result
const { validationResult } = require('express-validator');
// Import JSON Web Token
const jwt = require('jsonwebtoken');


exports.authenticateUser = async (req, res) => {

  // Check for errors
  const errors = validationResult(req);
  if( !errors.isEmpty() ){
    return res.status(400).json({ errors: errors.array() });
  }
  
  // Destructuring
  const { email, password } = req.body
  
  try {
    
    // Check that user is´t registered
    let user = await User.findOne({ email });
    if( !user ){
      return res.status(400).json({ msn: "The user doesn't exist" });
    }

    // Check password
    const correctPass = await bcryptjs.compare(password, user.password)
    if( !correctPass ){
      return res.status(400).json({ msn: "Password is incorrect" });
    }else{
      console.log('Request correct...')
    }

    //-> JWT
    // If is correct, create and signature the JWT
    const payload = {
      user: {
        id: user.id
      }
    }
    // Signature the JWT
    jwt.sign(payload, process.env.TOKEN_WORD, {
      expiresIn: 3600000
    }, (error, token) => {
      if(error) throw error;

      // Confirmation message
      res.json({ token });
      // res.json({ msn: 'The user was created successfully' })

    })

  } catch (error) {
    console.log(error)
  }

}

// Get what user is already authenticated
exports.authUser = async (req, res) => {

  try {
    
    const user = await User.findById(req.user.id).select('-password');
    res.json({ user });

  } catch (error) {
    
    console.log(error)
    res.status(500).json({ msn: 'There was a mistake...' });

  }

}