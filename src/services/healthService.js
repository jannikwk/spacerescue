const healthRepository = require('../repositories/healthRepository');

function getHealth() {
  return {
    status: 'ok',
    database: healthRepository.getDatabaseStatus(),
  };
}

module.exports = { getHealth };
