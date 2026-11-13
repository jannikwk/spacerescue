const express = require('express');
const shipController = require('../controllers/shipController');

const router = express.Router();

router.get('/ships', shipController.getAllShips);
router.get('/ships/:id', shipController.getShipById);
router.post('/ships', shipController.createShip);

module.exports = router;
