const http = require('http');
require('dotenv').config();
const {
  methodGet,
  methodPost,
  methodPut,
  methodDelete
} = require('./routes');

const server = http.createServer((req, res) => {
  switch(req.method) {
    case 'GET':
      methodGet(req, res);
      break;
    case 'POST':
      methodPost(req, res);
      break;
    case 'PUT':
      methodPut(req, res);
      break;
    case 'DELETE':
      methodDelete(req, res);
      break;
    default:
      res.writeHead(400, 'Content-Type', 'application/json');
      res.end(JSON.stringify({message: `Unknown method ${req.method}`}));
      break;
  }
});

module.exports = server;
