const Mission = require("../models/Mission");

const getAllMissions = async () => {
    return Mission.find();
}

const getMissionById = async (id) => {
    return await Mission.findById(id);
}

const createMission = async (missionData) => {
    return await Mission.create(missionData);
}

module.exports = {
    getAllMissions,
    getMissionById,
    createMission
}