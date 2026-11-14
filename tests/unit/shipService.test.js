const { afterEach, describe, expect, it, jest } = require('@jest/globals');

jest.mock('../../src/repositories/shipRepository');

const shipRepository = require('../../src/repositories/shipRepository');
const shipService = require('../../src/services/shipService');

describe('shipService', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getAllShips', () => {
    it('should return all ships from the repository', async () => {
      const ships = [{ name: 'Orion' }];
      shipRepository.findAll.mockResolvedValue(ships);

      await expect(shipService.getAllShips()).resolves.toBe(ships);
      expect(shipRepository.findAll).toHaveBeenCalledTimes(1);
    });
  });

  describe('getShipById', () => {
    it('should return the repository result for an id', async () => {
      const ship = { name: 'Orion' };
      shipRepository.findById.mockResolvedValue(ship);

      await expect(shipService.getShipById('ship-id')).resolves.toBe(ship);
      expect(shipRepository.findById).toHaveBeenCalledWith('ship-id');
    });
  });

  describe('createShip', () => {
    it('should always create a ship with available status', async () => {
      shipRepository.create.mockResolvedValue({ name: 'Orion', status: 'available' });

      await shipService.createShip({ name: 'Orion', type: 'Explorer', status: 'lost' });

      expect(shipRepository.create).toHaveBeenCalledWith({
        name: 'Orion',
        type: 'Explorer',
        status: 'available',
      });
    });
  });
});
