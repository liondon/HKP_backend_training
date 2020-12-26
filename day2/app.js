/* This is adopted from w3schools.com - Node.js Tutorial: https://www.w3schools.com/nodejs/default.asp */

// include the modules
const http = require('http');
const url = require('url');
const fs = require('fs');
const dt = require('./module');

const hostname = '127.0.0.1';
const port = 3000;

// create Node.js server
const server = http.createServer((req, res) => {
  // add HTTP Header
  res.statusCode = 200
  res.setHeader('Content-type', 'text/html');
  // NOTE:can also do this in one line:
  // res.writeHead(200, {'Content-Type': 'text/html'});

  // write a response to the client
  res.write(`<h1>Hello World!</h1>`)
  res.write(`<h2>1. The date and time are currently: ${dt.myDateTime()}</h2>`);

  // read and parse the query string
  const query = url.parse(req.url, true).query;
  const text = `year: ${query.year}, month: ${query.month}`;
  res.write(`<h2>2. The query string is: ${text}</h2>`);

  // using the fs module
  // NOTE: there's also fs.open(), fs.rename(), etc.
  // NOTE: use sync func here to assure execution order  
  try {
    // create/append file
    fs.appendFileSync('new.html', '<h1>this is from newly created file</h1>');
    console.log('File created!')

    // read file and write to response
    res.write(fs.readFileSync('new.html'));

    // over-write the existing file (or create new file) 
    fs.writeFileSync('new.html', '<h1>this is the over-written file</h1>');
    console.log('File over-written!')
    res.write(fs.readFileSync('new.html'));

    // delete file
    fs.unlinkSync('new.html');
    console.log('File deleted!');

  } catch (err) {
    throw err;
  }

  // NOTE: if there's asynchronous functions, 
  // this has to be put inside the last executed function
  // to make sure res only ends after all functions are executed. 
  return res.end();
});

// the server object listens on `hostname:port`
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}`);
});