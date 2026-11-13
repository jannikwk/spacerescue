const express = require('express');
const shipController = require('../controllers/shipController');
const validateShip = require('../middleware/validateShip');
const validateShipId = require('../middleware/validateShipId');

const router = express.Router();

router.get('/ships', shipController.getAllShips);
router.get('/ships/:id', validateShipId, shipController.getShipById);
router.post('/ships', validateShip, shipController.createShip);

module.exports = router;
