const express = require('express');
const shipRoutes = require('./shipRoutes');

const router = express.Router();

router.use('/api', shipRoutes);

module.exports = router;
