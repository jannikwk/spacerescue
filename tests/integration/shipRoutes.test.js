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
const Ship = require('../../src/models/Ship');

const shipData = { name: 'Orion', type: 'Explorer' };
const storedShipData = { ...shipData, status: 'available' };
let mongoServer;

async function createShip(data = storedShipData) {
  return Ship.create(data);
}

function expectShip(response, ship = storedShipData) {
  expect(response.status).toBe(200);
  expect(response.body).toMatchObject(ship);
}

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  await mongoose.connect(mongoServer.getUri());
}, 10000);

afterEach(async () => {
  await Ship.deleteMany({});
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe('GET /api/ships', () => {
  it('should return all ships', async () => {
    await createShip();

    const response = await request(app).get('/api/ships');

    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(1);
    expect(response.body[0]).toMatchObject(storedShipData);
  });

  it('should return an empty array when no ships exist', async () => {
    const response = await request(app).get('/api/ships');

    expect(response.status).toBe(200);
    expect(response.body).toEqual([]);
  });
});

describe('GET /api/ships/:id', () => {
  it('should return a ship by id', async () => {
    const ship = await createShip();

    const response = await request(app).get(`/api/ships/${ship.id}`);

    expectShip(response, { _id: ship.id, ...storedShipData });
  });

  it('should return 404 when the ship does not exist', async () => {
    const id = new mongoose.Types.ObjectId().toString();

    const response = await request(app).get(`/api/ships/${id}`);

    expect(response.status).toBe(404);
    expect(response.body).toEqual({ error: 'Ship not found.' });
  });

  it('should reject an invalid id', async () => {
    const response = await request(app).get('/api/ships/not-an-id');

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error');
  });
});

describe('POST /api/ships', () => {
  it('should create a ship with available status', async () => {
    const response = await request(app)
      .post('/api/ships')
      .send(shipData);

    expect(response.status).toBe(201);
    expect(response.body).toMatchObject(storedShipData);
    await expect(Ship.countDocuments()).resolves.toBe(1);
  });

  it('should reject a ship with missing fields', async () => {
    const response = await request(app)
      .post('/api/ships')
      .send({ name: shipData.name });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error');
    await expect(Ship.countDocuments()).resolves.toBe(0);
  });

  it('should reject names and types shorter than three characters', async () => {
    const response = await request(app)
      .post('/api/ships')
      .send({ name: 'Or', type: 'X' });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error');
  });

  it('should trim valid string fields', async () => {
    const response = await request(app)
      .post('/api/ships')
      .send({
        name: `  ${shipData.name}  `,
        type: `  ${shipData.type}  `,
      });

    expect(response.status).toBe(201);
    expect(response.body).toMatchObject({
      name: 'Orion',
      type: 'Explorer',
    });
  });
});

