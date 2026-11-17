const express = require('express');
const shipController = require('../controllers/shipController');
const validateShip = require('../middleware/validateShip');
const validateShipId = require('../middleware/validateShipId');

const router = express.Router();

router.get('/', shipController.getAllShips);
router.get('/:id', validateShipId, shipController.getShipById);
router.post('/', validateShip, shipController.createShip);

module.exports = router;
