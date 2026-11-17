const express = require('express');
const missionController = require('../controllers/missionController');

const router = express.Router();

router.get('/', missionController.getAllMissions);
router.get('/:id', missionController.getMissionById);
router.post('/', missionController.createMission);
router.post('/:id/assign', missionController.assignShipToMission);
router.get('/:id/assignment', missionController.getMissionAssignment);
router.patch('/:id/complete', missionController.markMissionAsCompleted);

module.exports = router;