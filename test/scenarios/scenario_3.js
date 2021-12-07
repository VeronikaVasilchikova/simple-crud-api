const supertest = require('supertest');

const testScenario_3 = (server) => {
  describe('Simple CRUD API. The third test scenario:', () => {

    test('GET/person request should be sent to correct address', async () => {
      const route = '/persons';
      const response = await supertest(server)
        .get(route);
      const parsedResponseText = JSON.parse(response.text);
      expect(response.status).toBe(404);
      expect(parsedResponseText.message).toBe(`Sorry, requested route ${route} not found`);
    });

    test('GET/person/{personId} request should have valid personId', async () => {
      const personId = '-gh$-!';
      const response = await supertest(server)
        .get(`/person/${personId}`);
      const parsedResponseText = JSON.parse(response.text);
      expect(response.status).toBe(400);
      expect(parsedResponseText.message).toBe(`Sorry, id ${personId} is invalid`);
    });

    test('PUT/person/{personId} request should have existing method', async () => {
      const personId = 'e45b350f-46e1-4a23-b49a-cd7c892f66a8';
      const response = await supertest(server)
        .copy(`/person/${personId}`)
        .send({
          "name": "New name"
        });
      const parsedResponseText = JSON.parse(response.text);
      expect(response.status).toBe(400);
      expect(parsedResponseText.message).toBe(`Unknown method COPY`);
    });

  });
};

module.exports = testScenario_3;
