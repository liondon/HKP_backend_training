/* This is adopted from w3schools.com - Node.js MongoDB Tutorial: https://www.w3schools.com/nodejs/nodejs_mongodb.asp */

const MongoClient = require('mongodb').MongoClient
const url = 'mongodb://localhost:27017/'

// 1. connect to a database
// NOTE: MongoDB will create the database if it does not exist
// NOTE: In MongoDB, a database is not created until it gets content. MongoDB waits until you have created a collection(table), with at least one document(record) before it actually creates the database(and collection).
MongoClient.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(db => {
    const dbo = db.db('mydb')
    console.log('Database created!')

    // // 2. create a collection
    // // NOTE: throw error when the collection already exist!
    // // NOTE: In MongoDB, a collection is not created until it gets content! MongoDB waits until you have inserted a document before it actually creates the collection.
    // dbo.createCollection('customers')
    //   .then(res => {
    //     console.log('Collection created!')
    //   })

    // 3.1 insert a record
    // NOTE: If you try to insert documents in a collection that do not exist, MongoDB will create the collection automatically.
    const record = { name: 'Co Inc', address: 'Highway 37' }
    dbo.collection('customers')
      .insertOne(record)
      .then(res => {
        console.log('a single document inserted!')

        // 3.2 insert many records
        const records = [
          { name: 'name_1', address: 'addr_1' },
          { name: 'name_2', address: 'addr_2' }
        ]
        dbo.collection('customers')
          .insertMany(records)
          .then(res => {
            console.log('many documents inserted! #Documents inserted = ' + res.insertedCount)

            // 3.3 take a look at the result obj
            console.log(JSON.stringify(res))

            // finally, close the connection
            console.log('Closing the connection!')
            db.close()
          })
      })
  })
  .catch(err => { throw err })
