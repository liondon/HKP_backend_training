/* This is adopted from w3schools.com - Node.js Tutorial: https://www.w3schools.com/nodejs/default.asp */

// include the modules
const http = require('http')
const url = require('url')
const fs = require('fs')
const formidable = require('formidable')
const uc = require('upper-case')
const dt = require('./module')

const hostname = '127.0.0.1'
const port = 3000

// **** 1. the http module ****//
// 1.1 create Node.js server
const server = http.createServer((req, res) => {
  // 1.2 add HTTP Header
  res.statusCode = 200
  res.setHeader('Content-type', 'text/html')
  // NOTE:can also do this in one line:
  // res.writeHead(200, {'Content-Type': 'text/html'});

  // 1.3 write a response to the client
  res.write(uc.upperCase('<h1>Hello World!</h1>'))
  res.write(`<h2>1. The date and time are currently: ${dt.myDateTime()}</h2>`)

  // **** 2. the url module **** //
  const q = url.parse(req.url, true)
  // 2.1 read and parse the entire request
  console.log(`q = ${JSON.stringify(q)}`)
  // TODO: q.host didn't get `${hostname}:${port}` as expected, why?
  console.log(`q.host = ${q.host}`)
  console.log(`q.pathname = ${q.pathname}`)
  console.log(`q.search = ${q.search}`)
  // 2.2 read and parse the query string
  const query = q.query
  console.log(`query = ${JSON.stringify(query)}`) // need to transfer the JSON obj
  const text = `year: ${query.year}, month: ${query.month}`
  res.write(`<h2>2. The query string is: ${text}</h2>`)

  // 3.0 Node.js File Server
  // if query.text is not empty, write it to file and shows it
  if (query.text) {
    // **** 3. the fs module **** //
    // NOTE: there's also fs.open(), fs.rename(), etc.
    // NOTE: use sync func here to assure execution order
    try {
      // 3.1 create/append file
      fs.appendFileSync('new.html', '<h1>this is from newly created file</h1>')
      console.log('File created!')

      // 3.2 read file and write to response
      res.write(fs.readFileSync('new.html'))

      // 3.3 over-write the existing file (or create new file)
      fs.writeFileSync('new.html', `<h1>this is from user-defined content: ${query.text}</h1>`)
      console.log('File over-written!')
      res.write(fs.readFileSync('new.html'))

      // 3.4 delete file
      fs.unlinkSync('new.html')
      console.log('File deleted!')
    } catch (err) {
      // TODO: shouldn't return 500... what's more appropriate?
      res.writeHead(500, { 'Content-Type': 'text/html' })
      return res.end('500 Internal Server Error')
    }
  } else { // use the helloWorld.html
    try {
      res.write(fs.readFileSync('helloWorld.html'))
    } catch (err) {
      res.writeHead(404, { 'Content-Type': 'text/html' })
      return res.end('404 Not Found')
    }
  }

  // **** 4. the formidable module **** //
  if (req.url === '/fileupload') {
    // 4.2 parse the uploaded file
    const form = new formidable.IncomingForm()
    form.parse(req, (err, fields, files) => {
      if (err) throw err
      const oldpath = files.filetoupload.path
      const newpath = './temp/' + files.filetoupload.name
      fs.rename(oldpath, newpath, (e) => {
        if (e) throw e
        res.write('File uploaded')
        res.end()
      })
    })
  } else {
    // 4.1 create an upload form
    res.write('<form action="fileupload" method="post" enctype="multipart/form-data">')
    res.write('<input type="file" name="filetoupload"><br>')
    res.write('<input type="submit">')
    res.write('</form>')

    // NOTE: if there's asynchronous functions,
    // this has to be put inside the last executed function
    // to make sure res only ends after all functions are executed.
    return res.end()
  }
})

// 1.4 the server object listens on `hostname:port`
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}`)
})
