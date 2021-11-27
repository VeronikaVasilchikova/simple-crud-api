const http = require('http');
require('dotenv').config();
const {
  getPersons,
  getPerson,
  createPerson,
  updatePerson,
  removePerson
} = require('./controllers/personController');
const { PARAMS_RULES } = require('./constants');

const { PORT = 3000, HOST = 'localhost'} = process.env;

const server = http.createServer((req, res) => {
  const params = new RegExp(PARAMS_RULES);
  if (req.url === '/person' && req.method === 'GET') {
    getPersons(req, res);
  }
  else if (req.url.match(params) && req.method === 'GET') {
    const urlArray = req.url.split('/');
    const personId = urlArray[urlArray.length - 1];
    getPerson(req, res, personId);
  }
  else if (req.url === '/person' && req.method === 'POST') {
    createPerson(req, res);
  }
  else if (req.url.match(params) && req.method === 'PUT') {
    const urlArray = req.url.split('/');
    const personId = urlArray[urlArray.length - 1];
    updatePerson(req, res, personId);
  }
  else if (req.url.match(params) && req.method === 'DELETE') {
    const urlArray = req.url.split('/');
    const personId = urlArray[urlArray.length - 1];
    removePerson(req, res, personId);
  }
  else {
    res.writeHead(404, 'Content-Type', 'application/json');
    res.end(JSON.stringify({message: `Sorry, requested route ${req.url} not found`}));
  }

});

server.listen(PORT, HOST, (error) => {
  error ? console.log(error) : console.log(`listening port ${PORT}`);
});
