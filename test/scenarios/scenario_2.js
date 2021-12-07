const supertest = require('supertest');

const testScenario_2 = (server) => {
  describe('Simple CRUD API. The second test scenario:', () => {
    const initialData = [{
      "id":"e45b350f-46e1-4a23-b49a-cd7c892f66a8",
      "name":"Erick",
      "age":26,
      "hobbies":["reading"]
    }];

    test('POST/person request must have the following properties: name, age, hobbies', async () => {
      const response = await supertest(server)
        .post('/person')
        .send({
          "age": 13,
          "hobbies": []
        });
      const parsedResponseText = JSON.parse(response.text);
      expect(response.status).toBe(400);
      expect(parsedResponseText.message).toBe('Sorry, you missed required properties: name');
    });

    test('POST/person request requires proper person properties', async () => {
      const response = await supertest(server)
        .post('/person')
        .send({
          "name": "Kate",
          "age": "13",
          "hobbies": [3]
        });
      const parsedResponseText = JSON.parse(response.text);
      expect(response.status).toBe(400);
      expect(parsedResponseText.message)
        .toBe('Sorry but age should be number, hobbies should be empty array or array with string items');
    });

    test('PUT/person/{personId} requires proper person properties', async () => {
      const personId = initialData[0].id;
      const response = await supertest(server)
        .put(`/person/${personId}`)
        .send({
          name: null
        });
      const parsedResponseText = JSON.parse(response.text);

      expect(response.status).toBe(400);
      expect(parsedResponseText.message).toBe('Sorry but name should be string');
    });
  });
};

module.exports = testScenario_2;
