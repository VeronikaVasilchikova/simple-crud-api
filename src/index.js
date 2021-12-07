const server = require('./server');
const { PORT = 3000, HOST = 'localhost'} = process.env;

server.listen(PORT, HOST, (error) => {
  error ? console.log(error) : console.log(`listening port ${PORT}`);
});
