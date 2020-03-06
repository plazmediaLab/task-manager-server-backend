// We import mongoose
const mongoose = require('mongoose');
// We import the environment variables
require('dotenv').config({ path: 'variables.env' });


const  conectDB = async () => {
  try {
    // DELETE messange [DeprecationWarning: collection.ensureIndex is deprecated. Use createIndexes instead.]
    mongoose.set('useCreateIndex', true);
    // Receive two parameters
    // 1-. URL from connection
    // 2-. Connection config object
    await mongoose.connect(process.env.DB_MONGO, {
      // This configurations are to avoid internal problems 
      // useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false
      // -------------------------------------------------
    });
    console.log('DB  connected...')
  } catch (error) {
    console.log(error)
    process.exit(1);// Stop app
  }
}

module.exports = conectDB;