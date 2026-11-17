const missionRepository = require('../repositories/missionRepository');
const shipService = require('./shipService');

async function assignShipToMission(missionId, shipId) {
  const mission = await missionRepository.getMissionById(missionId);
  if (!mission) {
    throw new Error('Mission not found.');
  }

  const ship = await shipService.getShipById(shipId);
  if (!ship) {
    throw new Error('Ship not found.');
  }

  mission.assignedShip = shipId;
  mission.status = 'assigned';
  await mission.save();

  await shipService.updateShipStatus(shipId, 'busy');
  return { assignedShip: mission.assignedShip };
}

async function getMissionAssignment(missionId) {
  return missionRepository.getMissionById(missionId);
}

module.exports = { assignShipToMission, getMissionAssignment };
