const supertest = require('supertest');

const testScenario_1 = (server) => {
  describe('Simple CRUD API. The first test scenario:', () => {
    let person;

    afterAll(() => {
      person = {};
    });

    test('POST/person request should create a new person', async () => {
      const response = await supertest(server)
        .post('/person')
        .send({
          "name": "Test name",
          "age": 13,
          "hobbies": []
        });
      const parsedResponseText = JSON.parse(response.text);
      person = {
        id: parsedResponseText.id,
        "name": "Test name",
        "age": 13,
        "hobbies": []
      }
      expect(response.status).toBe(201);
      expect(parsedResponseText).toStrictEqual(person);
    });

    test('GET/person/{personId} request should return the person by id from database', async () => {
      const response = await supertest(server).get(`/person/${person.id}`);
      const parsedResponseText = JSON.parse(response.text);

      expect(response.status).toBe(200);
      expect(parsedResponseText).toStrictEqual(person);
    });

    test('PUT/person/{personId} should update the existing person', async () => {
      const response = await supertest(server)
        .put(`/person/${person.id}`)
        .send({
          name: "Updated name"
        });
      const parsedResponseText = JSON.parse(response.text);
      const updatedPerson = {
        ...person,
        name: "Updated name"
      };

      expect(response.status).toBe(200)
      expect(parsedResponseText).toStrictEqual(updatedPerson);
    });

    test('DELETE/person/{personId} should remove the existing person from database', async () => {
      const response = await supertest(server).delete(`/person/${person.id}`);

      expect(response.status).toBe(204);
    });
  });
};

module.exports = testScenario_1;
