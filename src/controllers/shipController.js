const shipService = require('../services/shipService');

async function getAllShips(req, res) {
  const ships = await shipService.getAllShips();
  res.status(200).json(ships);
}

async function getShipById(req, res) {
  const ship = await shipService.getShipById(req.params.id);

  if (!ship) {
    return res.status(404).json({ error: 'Ship not found.' });
  }

  return res.status(200).json(ship);
}

async function createShip(req, res) {
  const { name, type } = req.body || {};

  if (typeof name !== 'string' || typeof type !== 'string' ||
      !name.trim() || !type.trim()) {

    return res.status(400).json({ error: 'Name and type are required.' });
  }

  const shipData = {
    name: name.trim(),
    type: type.trim()
  }

  const ship = await shipService.createShip(shipData);
  return res.status(201).json(ship);
}

module.exports = { getAllShips, getShipById, createShip };
