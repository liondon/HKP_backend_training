/* This is adopted from w3schools.com - Node.js MongoDB Tutorial: https://www.w3schools.com/nodejs/nodejs_mongodb.asp */

const MongoClient = require('mongodb').MongoClient
const url = 'mongodb://localhost:27017/'

// 1. connect to a database
// NOTE: MongoDB will create the database if it does not exist
// NOTE: In MongoDB, a database is not created until it gets content. MongoDB waits until you have created a collection(table), with at least one document(record) before it actually creates the database(and collection).
MongoClient.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}, (err, db) => {
  if (err) throw err
  const dbo = db.db('mydb')
  console.log('Database created!')

  // 2. create a collection
  // NOTE: In MongoDB, a collection is not created until it gets content! MongoDB waits until you have inserted a document before it actually creates the collection.
  dbo.createCollection('customers', (err, res) => {
    if (err) throw err
    console.log('Collection created!')
    db.close()
  })
})
