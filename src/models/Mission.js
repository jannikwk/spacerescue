const mongoose = require('mongoose');

const missionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  destination: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  assignedShip: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Ship',
    default: null,
  },
});

module.exports = mongoose.model('Mission', missionSchema);
