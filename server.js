const http = require('http');
const app = require('./app');

// create port
const port = process.env.PORT || 3000;

// init server
const server = http.createServer(app);

server.listen(port);