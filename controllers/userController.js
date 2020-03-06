const User = require('../models/User');
const bcryptjs = require('bcryptjs')
// Import the validation result
const { validationResult } = require('express-validator');
// Import JSON Web Token
const jwt = require('jsonwebtoken');


exports.createUser = async (req, res) => {

  // Check for errors
  const errors = validationResult(req);
  if( !errors.isEmpty() ){
    return res.status(400).json({ errors: errors.array() });
  }

  // Destructuring
  const {email, password} = req.body;

  try {
    // Match the same email in the database 
    let user = await User.findOne({ email });

    // If an equal email is already exist
    if(user){
      return res.status(400).json({ msn: 'The user already exist' })
    }

    // Create new user
    user = new User(req.body);

    // Hash password
    const salt = await bcryptjs.genSalt(10);
    user.password = await bcryptjs.hash(password, salt);

    // Save new user
    await user.save();

    //-> JWT
    // Create and signature the JWT
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

    console.log(error);
    res.status(400).send('There was a mistake...');

  }
}

/* 

  JWT -> JSON Web Token

  Es un estándar cuyo fin es permitir compartir información entre aplicaciones
  en un objeto JSON.

  2 aplicaciones web pueden compartir datos seguros utilizando JWT, ya que
  verifican la autenticidad del JSON.

  JWT puede ser utilizado en cualquier framework o librería.

  =============================================================================

  ¿CUÁNDO UTILIZAR JWT?

  Autorización: Es el más común, cuando el usuario ha sido logueado se almacena
  le JWT y se verifica para que pueda acceder a las distintas rutas de la 
  aplicación, servicios o recursos que permite el Token.

  Intercambio de informacíón: Son seguros para compartir datos entre aplicaciones,
  de esta forma te aseguras que los datos enviados a un servidor no serán
  interceptados. 

  =============================================================================

  JWT consta de tres partes principales

  Header -> Tipo de JWT y algoritmo

  Payload -> Información de la entidad y datos adicionales

  Signature -> Verifica que el mensaje no ha cambiado en su transporte

*/