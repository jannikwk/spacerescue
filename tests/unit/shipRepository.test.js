const { afterEach, describe, expect, it, jest } = require('@jest/globals');

jest.mock('../../src/models/Ship');

const Ship = require('../../src/models/Ship');
const shipRepository = require('../../src/repositories/shipRepository');

describe('shipRepository', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('findAll', () => {
    it('should return lean ship documents', async () => {
      const ships = [{ name: 'Orion' }];
      Ship.find.mockReturnValue({ lean: jest.fn().mockResolvedValue(ships) });

      await expect(shipRepository.findAll()).resolves.toBe(ships);
      expect(Ship.find).toHaveBeenCalledWith();
    });
  });

  describe('findById', () => {
    it('should find one ship by id as a lean document', async () => {
      const ship = { name: 'Orion' };
      Ship.findById.mockReturnValue({ lean: jest.fn().mockResolvedValue(ship) });

      await expect(shipRepository.findById('ship-id')).resolves.toBe(ship);
      expect(Ship.findById).toHaveBeenCalledWith('ship-id');
    });
  });

  describe('create', () => {
    it('should create a ship and return a plain object', async () => {
      const shipData = { name: 'Orion', type: 'Explorer', status: 'available' };
      Ship.create.mockResolvedValue({ toObject: jest.fn().mockReturnValue(shipData) });

      await expect(shipRepository.create(shipData)).resolves.toBe(shipData);
      expect(Ship.create).toHaveBeenCalledWith(shipData);
    });
  });
});
