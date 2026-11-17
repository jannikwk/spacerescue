const express = require('express');
const shipRoutes = require('./shipRoutes');
const missionRoutes = require('./missionRoutes');

const router = express.Router();

router.use('/api/ships', shipRoutes);
router.use('/api/missions', missionRoutes);

module.exports = router;
