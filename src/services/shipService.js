const shipRepository = require('../repositories/shipRepository');

async function getAllShips() {
  return shipRepository.findAll();
}

async function getShipById(id) {
  return shipRepository.findById(id);
}

module.exports = { getAllShips, getShipById };
