const { describe, expect, it, jest } = require('@jest/globals');

const validateShip = require('../../src/middleware/validateShip');
const validateShipId = require('../../src/middleware/validateShipId');

function createResponse() {
  return {
    status: jest.fn().mockReturnThis(),
    json: jest.fn().mockReturnThis(),
  };
}

describe('validateShip', () => {
  it('should trim valid fields and call next', () => {
    const req = { body: { name: '  Orion ', type: ' Explorer ' } };
    const res = createResponse();
    const next = jest.fn();

    validateShip(req, res, next);

    expect(next).toHaveBeenCalledTimes(1);
    expect(req.body).toEqual({ name: 'Orion', type: 'Explorer' });
  });

  it('should return 400 for invalid input', () => {
    const req = { body: { name: 'Or' } };
    const res = createResponse();
    const next = jest.fn();

    validateShip(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ error: expect.any(String) }));
    expect(next).not.toHaveBeenCalled();
  });
});

describe('validateShipId', () => {
  it('should accept a valid MongoDB object id', () => {
    const req = { params: { id: '507f1f77bcf86cd799439011' } };
    const res = createResponse();
    const next = jest.fn();

    validateShipId(req, res, next);

    expect(next).toHaveBeenCalledTimes(1);
    expect(req.params.id).toBe('507f1f77bcf86cd799439011');
  });

  it('should return 400 for an invalid id', () => {
    const req = { params: { id: 'invalid' } };
    const res = createResponse();
    const next = jest.fn();

    validateShipId(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ error: expect.any(String) }));
    expect(next).not.toHaveBeenCalled();
  });
});
