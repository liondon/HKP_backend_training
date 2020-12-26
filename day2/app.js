/* This is adopted from w3schools.com - Node.js Tutorial: https://www.w3schools.com/nodejs/default.asp */

// include the `http` module
const http = require('http');
const dt = require('./module')

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200
  res.setHeader('Content-type', 'text/html');
  // can also write these in one line:
  // res.writeHead(200, {'Content-Type': 'text/html'});
  res.write('<h1>Hello World! The date and time are currently: </h1>' + dt.myDateTime());
  res.end();
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}`);
});