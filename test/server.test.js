const fs = require('fs');
const request = require('supertest');
const server = require('../src/server');

describe('Simple CRUD API test', () => {
  let person;

  afterAll(() => {
    if (fs.existsSync('../src/data/index.json')) {
      fs.writeFileSync('../src/data/index.json', [], () => {});
    }
    person = {};
  });

  test('GET/person request should return all persons from database', async () => {
    const response = await request(server).get('/person');
    const paresedResponseText = JSON.parse(response.text);

    expect(response.status).toBe(200);
    expect(paresedResponseText.length).toBe(0);
  });

  test('POST/person request should create a new person', async () => {
    const response = await request(server)
      .post('/person')
      .send({
        "name": "Test name",
        "age": 13,
        "hobbies": []
      });
    const paresedResponseText = JSON.parse(response.text);
    person = {
      id: paresedResponseText.id,
      "name": "Test name",
      "age": 13,
      "hobbies": []
    }
    expect(response.status).toBe(201);
    expect(paresedResponseText).toStrictEqual(person);
  });

  test('GET/person/{personId} request should return the person by id from database', async () => {
    const response = await request(server).get(`/person/${person.id}`);
    const paresedResponseText = JSON.parse(response.text);

    expect(response.status).toBe(200);
    expect(paresedResponseText).toStrictEqual(person);
  });

  test('PUT/person/{personId} should update the existing person', async () => {
    const response = await request(server)
      .put(`/person/${person.id}`)
      .send({
        name: "Updated name"
      });
    const paresedResponseText = JSON.parse(response.text);
    const updatedPerson = {
      ...person,
      name: "Updated name"
    };

    expect(response.status).toBe(200)
    expect(paresedResponseText).toStrictEqual(updatedPerson);
  });

  test('DELETE/person/{personId} should remove the existing person from database', async () => {
    const response = await request(server).delete(`/person/${person.id}`);

    expect(response.status).toBe(204);
  });
});
