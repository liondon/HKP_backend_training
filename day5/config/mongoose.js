const mongoose = require('mongoose')

const mongodbURI = 'mongodb://localhost/HKP_bkndTrngDay5'

mongoose.connect(mongodbURI, { useNewUrlParser: true })

const db = mongoose.connection

db.on('error', () => {
  console.error.bind(console, 'connection error:')
})

db.once('open', () => {
  console.log('mongodb connected!')
})

module.exports = db
