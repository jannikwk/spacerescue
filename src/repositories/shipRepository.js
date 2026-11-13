const Ship = require('../models/Ship');

async function findAll() {
  return Ship.find().lean();
}

async function findById(id) {
  return Ship.findById(id).lean();
}

async function create(shipData) {
  const ship = await Ship.create(shipData);
  return ship.toObject();
}

module.exports = { findAll, findById, create };
