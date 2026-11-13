const mongoose = require('mongoose');
const Ship = require('../models/Ship');

async function findAll() {
  return Ship.find().lean();
}

async function findById(id) {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return null;
  }

  return Ship.findById(id).lean();
}

module.exports = { findAll, findById };
