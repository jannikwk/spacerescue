const { afterEach, describe, expect, it, jest } = require('@jest/globals');

jest.mock('../../src/services/shipService');

const shipService = require('../../src/services/shipService');
const {
  getAllShips,
  getShipById,
  createShip,
} = require('../../src/controllers/shipController');

function createResponse() {
  return {
    status: jest.fn().mockReturnThis(),
    json: jest.fn().mockReturnThis(),
  };
}

describe('shipController', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getAllShips', () => {
    it('should return all ships with status 200', async () => {
      const ships = [{ name: 'Orion' }];
      shipService.getAllShips.mockResolvedValue(ships);
      const res = createResponse();

      await getAllShips({}, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(ships);
    });
  });

  describe('getShipById', () => {
    it('should return a ship with status 200', async () => {
      const ship = { name: 'Orion' };
      shipService.getShipById.mockResolvedValue(ship);
      const res = createResponse();

      await getShipById({ params: { id: 'ship-id' } }, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(ship);
    });

    it('should return 404 when no ship is found', async () => {
      shipService.getShipById.mockResolvedValue(null);
      const res = createResponse();

      await getShipById({ params: { id: 'ship-id' } }, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: 'Ship not found.' });
    });
  });

  describe('createShip', () => {
    it('should return the created ship with status 201', async () => {
      const ship = { name: 'Orion' };
      shipService.createShip.mockResolvedValue(ship);
      const res = createResponse();

      await createShip({ body: { name: 'Orion' } }, res);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(ship);
    });
  });
});
