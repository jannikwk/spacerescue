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
  const ship = await shipService.createShip(req.body);
  return res.status(201).json(ship);
}

module.exports = { getAllShips, getShipById, createShip };
