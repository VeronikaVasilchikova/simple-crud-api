const server = require('./server');

server.listen(PORT, HOST, (error) => {
  error ? console.log(error) : console.log(`listening port ${PORT}`);
});
