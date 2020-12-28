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
  .then(async db => {
    try {
      const dbo = db.db('mydb')
      console.log('**** Database created! ****')

      // // 2. create a collection
      // // NOTE: throw error when the collection already exist!
      // // NOTE: In MongoDB, a collection is not created until it gets content! MongoDB waits until you have inserted a document before it actually creates the collection.
      // await dbo.createCollection('customers')
      // console.log('Collection created!')

      // 3.1 insert a record
      // NOTE: If you try to insert documents in a collection that do not exist, MongoDB will create the collection automatically.
      const record = { name: 'Co Inc', address: 'Highway 37' }
      await dbo.collection('customers').insertOne(record)
      console.log('**** a single document inserted! ****')

      // 3.2 insert many records
      const records = [
        { name: 'name_1', address: 'addr_1' },
        { name: 'name_2', address: 'addr_2' },
        { name: 'name_3', address: 'addr_3' }
      ]
      let res = await dbo.collection('customers').insertMany(records)
      console.log('**** many documents inserted! #Documents inserted = ' + res.insertedCount + ' ****')
      // 3.3 take a look at the result obj
      console.log(JSON.stringify(res))

      // 4.1 find one record that matches query cond
      let result = await dbo.collection('customers').findOne({})
      console.log('**** find one record: ' + result.name + ' ****')

      // 4.2 find all records that matches query cond
      result = await dbo.collection('customers').find({}).toArray()
      console.log('**** find many records ****')
      console.log(result)

      // 4.3 use projection parameter to specify the fields to return
      // NOTE: You will get an error if you specify both 0 and 1 values in the same object. If you specify a field with the value 0, all other fields get the value 1, and vice versa. But _id is an exception; to exclude the _id field, you must set its value to 0 explicitly
      result = await dbo.collection('customers')
        .find({}, { projection: { _id: 0, address: 1 } })
        .toArray()
      console.log('**** use projection to only shows addresses ****')
      console.log(result)

      // 4.4 use the query parameter to filter the result
      result = await dbo.collection('customers')
        .find({ address: /^addr_/ }) // use regular expression
        .toArray()
      console.log('**** find many records with query condition ****')
      console.log(result)

      // 4.5 use sort
      result = await dbo.collection('customers')
        .find()
        .sort({ name: -1 }) // '1'=ascending, '-1'=descending
        .toArray()
      console.log('**** sort the result ****')
      console.log(result)

      // 4.6 use limit
      result = await dbo.collection('customers')
        .find()
        .limit(2)
        .toArray()
      console.log('**** use limit to only return certain amount of results ****')
      console.log(result)

      // 6.1 update a document
      await dbo.collection('customers')
        .updateOne({ name: 'Co Inc' }, {
          $set: { address: 'addr_new' }
        })
      console.log('**** one document updated ****')
      console.log(await dbo.collection('customers').find().toArray())

      // 6.2 update many documents
      res = await dbo.collection('customers')
        .updateMany({
          name: /^name_/
        }, {
          $set: { address: 'New York City' }
        })
      console.log('**** ' + res.result.nModified + ' document(s) updated! ****')
      console.log(await dbo.collection('customers').find().toArray())
      // 6.3 take a look at the result obj
      console.log(res.result)

      // 5.1 delete one document: the first occurrence that matches the query condition
      await dbo.collection('customers')
        .deleteOne({ address: 'addr_1' })
      console.log('**** one document deleted! ****')
      console.log(await dbo.collection('customers').find().toArray())

      // 5.2 delete many
      res = await dbo.collection('customers')
        .deleteMany({ address: /^addr_/ })
      console.log('**** ' + res.result.n + ' documents deleted! ****')
      // 5.3 take a look at the result obj
      console.log(res.result)

      // 5.4 drop a collection
      result = await dbo.collection('customers').drop()
      if (result) {
        console.log('**** Collection deleted! ****')
      }
      // equals to:
      // dbo.dropCollection('customers')

      // 7. left-join two collections
      await dbo.collection('orders').drop()
      await dbo.collection('orders').insertMany([
        { _id: 1, product_id: 154, status: 1 }
      ])

      await dbo.collection('products').drop()
      await dbo.collection('products').insertMany([
        { _id: 154, name: 'Chocolate Heaven' },
        { _id: 155, name: 'Tasty Lemons' },
        { _id: 156, name: 'Vanilla Dreams' }
      ])

      res = await dbo.collection('orders')
        .aggregate([
          {
            $lookup: {
              from: 'products',
              localField: 'product_id',
              foreignField: '_id',
              as: 'orderDetails'
            }
          }
        ])
        .toArray()
      console.log('**** left-join two collections ****')
      console.log(JSON.stringify(res))


      // finally, close the connection
      console.log('**** Closing the connection! ****')
      db.close()
    } catch (err) {
      console.log(err)
      throw err
    }
  })
