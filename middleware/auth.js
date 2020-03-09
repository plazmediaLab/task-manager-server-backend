const jwt = require('jsonwebtoken');

module.exports = function(req, res, next){
  // Read the header token
  const token = req.header('x-auth-token');

  // Check if there is not token
  if(!token){
    return res.status(401).json({ msn: 'There is not token, access denied' })
  }

  // Validate token
  try {
    
    const encrypt = jwt.verify(token, process.env.TOKEN_WORD);
    req.user = encrypt.user;
    next();

  } catch (error) {

    res.status(401).json({ msn: 'Token is´t valid' })

  }
}