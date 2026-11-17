const missionService = require('../services/missionService');
const assignmentService = require('../services/assignmentService');

async function getAllMissions(req, res) {
    const missions = await missionService.getAllMissions();
    return res.status(200).json(missions);
}

async function getMissionById(req, res) {
    const mission = await missionService.getMissionById(req.params.id);

    if (!mission) {
        return res.status(404).json({ error: 'Mission not found.' });
    }

    return res.status(200).json(mission);
}

async function createMission(req, res) {
    const mission = await missionService.createMission(req.body);
    return res.status(201).json(mission);
}

async function assignShipToMission(req, res) {
    const { shipId } = req.body;
    const assignment = await assignmentService.assignShipToMission(req.params.id, shipId);
    return res.status(200).json(assignment);
}

async function getMissionAssignment(req, res) {
    const assignment = await assignmentService.getMissionAssignment(req.params.id);

    if (!assignment) {
        return res.status(404).json({ error: 'Mission not found.' });
    }

    return res.status(200).json(assignment);
}

async function markMissionAsCompleted(req, res) {
    await missionService.markMissionAsCompleted(req.params.id);
    return res.status(200).json({ message: 'Mission marked as completed.' });
}

module.exports = {
    getAllMissions,
    getMissionById,
    createMission,
    assignShipToMission,
    getMissionAssignment,
    markMissionAsCompleted
};