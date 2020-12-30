const express = require('express')
const bodyParser = require('body-parser')

// include routes
const routes = require('./routes')

// mongodb connection setup
require('./config/mongoose')

const app = express()
const port = 3000

// parse request
app.use(bodyParser.urlencoded({ extended: true }))

app.use(routes)

app.listen(port, () => {
  console.log(`Express Server is listening at http://localhost:${port}`)
})
