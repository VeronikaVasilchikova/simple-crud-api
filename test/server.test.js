const server = require('../src/server');
const { testScenario_1,
testScenario_2,
testScenario_3 } = require('./scenarios');


describe('Testing of Simple CRUD API', () => {
  afterAll(() => {
    server.close();
  });

  testScenario_1(server);
  testScenario_2(server);
  testScenario_3(server);
});
