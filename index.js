// Call express and keep it in a constant
const express = require('express');
const conectDB = require('./config/db')

// Use express in the app´s constant
const app = express();

// Connect to databases
conectDB()

// Enable express.json
app.use(express.json({ extended: true}))

// Create port
const PORT = process.env.PORT || 4000;

// Import routes
app.use('/api/users', require('./router/users'))

// Run app
app.listen(PORT, () => {
  console.log(`Run server in port ${PORT}`)
})