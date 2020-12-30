const express = require('express')
// const mongoose = require('mongoose')
const app = express()
const port = 3000

// mongodb connection setup
require('./config/mongoose')

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Express Server is listening at http://localhost:${port}`)
})
