const {
  afterAll,
  afterEach,
  beforeAll,
  describe,
  expect,
  it,
} = require('@jest/globals');
const request = require('supertest');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const app = require('../../server');
const Mission = require('../../src/models/Mission');
const Ship = require('../../src/models/Ship');

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  await mongoose.connect(mongoServer.getUri());
}, 10000);

afterEach(async () => {
  await Promise.all([Mission.deleteMany({}), Ship.deleteMany({})]);
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe('POST /api/missions/:id/assign', () => {
  it('persists the assignment and marks an available ship busy', async () => {
    const mission = await Mission.create({
      title: 'Rescue mission',
      destination: 'Europa',
      description: 'Rescue stranded explorers.',
      status: 'pending',
    });
    const ship = await Ship.create({
      name: 'Orion',
      type: 'Explorer',
      status: 'available',
    });

    const response = await request(app)
      .post(`/api/missions/${mission.id}/assign`)
      .send({ shipId: ship.id });

    expect(response.status).toBe(200);
    expect(response.body.assignedShip).toBe(ship.id);

    await expect(Mission.findById(mission.id).lean()).resolves.toMatchObject({
      assignedShip: ship._id,
    });
    await expect(Ship.findById(ship.id).lean()).resolves.toMatchObject({
      status: 'busy',
    });
  });

});

describe('GET /api/missions/:id/assignment', () => {
  it('returns the mission assignment', async () => {
    const ship = await Ship.create({
      name: 'Orion',
      type: 'Explorer',
      status: 'busy',
    });
    const mission = await Mission.create({
      title: 'Rescue mission',
      destination: 'Europa',
      description: 'Rescue stranded explorers.',
      status: 'assigned',
      assignedShip: ship._id,
    });

    const response = await request(app)
      .get(`/api/missions/${mission.id}/assignment`);

    expect(response.status).toBe(200);
    expect(response.body.assignedShip).toBe(ship.id);
  });
});

describe('PATCH /api/missions/:id/complete', () => {
    it('marks the mission complete and releases its assigned ship', async () => {
      const ship = await Ship.create({
        name: 'Orion',
        type: 'Explorer',
        status: 'busy',
      });
      const mission = await Mission.create({
        title: 'Rescue mission',
        destination: 'Europa',
        description: 'Rescue stranded explorers.',
        status: 'assigned',
        assignedShip: ship._id,
      });

      const response = await request(app)
        .patch(`/api/missions/${mission.id}/complete`);

      expect(response.status).toBe(200);
      await expect(Mission.findById(mission.id).lean()).resolves.toMatchObject({
        status: 'completed',
      });
      await expect(Ship.findById(ship.id).lean()).resolves.toMatchObject({
        status: 'available',
    });
  });
});
