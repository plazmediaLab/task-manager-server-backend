// Call express and keep it in a constant
const express = require("express");
const conectDB = require("./config/db");
const morgan = require('morgan');
const cors = require('cors');

// Use express in the app´s constant
const app = express();

// Connect to databases
conectDB();

// Enabled CORS
app.use(cors());

// Middlewares
app.use(express.json({ extended: true })); //-> Enable express.json
app.use(morgan('tiny'))

// Create port
const PORT = process.env.PORT || 4000;

// Import routes
app.use("/api/users", require("./router/users"));
app.use("/api/auth", require("./router/auth"));
app.use("/api/projects", require("./router/projects"));
app.use("/api/tasks", require('./router/tasks'));

// Run app
app.listen(PORT, () => {
  console.log(`Run server in port ${PORT}`);
});
