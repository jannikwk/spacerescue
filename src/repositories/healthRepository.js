const mongoose = require('mongoose');

function getDatabaseStatus() {
  return mongoose.connection.readyState === 1 ? 'connected' : 'disconnected';
}

module.exports = { getDatabaseStatus };
