require('dotenv').config();

const express = require('express');
const connectToDatabase = require('./src/config/database');
const routes = require('./src/routes');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(routes);

async function startServer() {
  try {
    await connectToDatabase();
    app.listen(port, () => {
      console.log(`Server listening on port ${port}`);
    });
  } catch (error) {
    console.error('Unable to start server:', error.message);
    process.exitCode = 1;
  }
}

startServer();

module.exports = app;
