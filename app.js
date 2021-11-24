const http = require('http');
const path = require('path');
const {PORT} = require('./constants');

const server = http.createServer((req, res) => {
  console.log('Server request', req.url, req.method);
  res.setHeader('Content-Type', 'application/json');

  const data = JSON.stringify([
    {
      id: 1,
      name: 'Name',
      age: 'Age'
    },
    {
      id: 2,
      name: 'Name',
      age: 'Age'
    }
  ]);
  res.end(data);
});

server.listen(PORT, 'localhost', (error) => {
  error ? console.log(error) : console.log(`listening port ${PORT}`);
});
