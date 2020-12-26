/* This is adopted from w3schools.com - Node.js Tutorial: https://www.w3schools.com/nodejs/default.asp */

// include the modules
const http = require('http');
const dt = require('./module')

const hostname = '127.0.0.1';
const port = 3000;

// create Node.js server
const server = http.createServer((req, res) => {
  // add HTTP Header
  res.statusCode = 200
  res.setHeader('Content-type', 'text/html');
  // can also do this in one line:
  // res.writeHead(200, {'Content-Type': 'text/html'});

  // write a response to the client
  res.write(`<h1>Hello World!</h1>`)
  res.write(`<h2>1. The date and time are currently: ${dt.myDateTime()}</h2>`);

  // read the query string
  res.write(`<h2>2. The query string is: ${req.url}</h2>`)

  // end the response
  res.end();
});

// the server object listens on `hostname:port`
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}`);
});