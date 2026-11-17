const missionRepository = require("../repositories/missionRepository");
const shipService = require("./shipService");

const getAllMissions = async () => {
    return missionRepository.getAllMissions();
}

const getMissionById = async (id) => {
    return missionRepository.getMissionById(id);
}

const createMission = async (missionData) => {
    return await missionRepository.createMission(missionData);
}

const markMissionAsCompleted = async (missionId) => {
    const mission = await missionRepository.getMissionById(missionId);
    if (!mission) {
        throw new Error('Mission not found.');
    }

    mission.status = 'completed';
    await mission.save();

    if (mission.assignedShip) {
        await shipService.updateShipStatus(mission.assignedShip, 'available');
    }
}

module.exports = {
    getAllMissions,
    getMissionById,
    createMission,
    markMissionAsCompleted
}