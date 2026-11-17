const shipRepository = require('../repositories/shipRepository');

async function getAllShips() {
  return shipRepository.findAll();
}

async function getShipById(id) {
  return shipRepository.findById(id);
}

async function createShip(shipData) {
  return shipRepository.create({
    ...shipData,
    status: 'available',
  });
}

async function updateShipStatus(id, status) {
  return shipRepository.updateStatus(id, status);
}

module.exports = { getAllShips, getShipById, createShip, updateShipStatus };
