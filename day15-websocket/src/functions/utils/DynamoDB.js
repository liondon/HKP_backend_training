const AWS = require('aws-sdk')

const documentClient = new AWS.DynamoDB.DocumentClient()

const DynamoDB = {
  async get(ID, TableName) {
    const params = {
      TableName,
      Key: {
        ID
      }
    }
    const data = await documentClient.get(params).promise()

    if (!data || !data.Item) {
      throw Error(`There was an err fetching data of ID=${ID} from ${TableName}`)
    }

    console.log(data)
    return data.Item
  },

  async write(data, TableName) {
    if (!data.ID) {
      throw Error('field: ID is required')
    }
    const params = {
      TableName,
      Item: data
    }
    const res = await documentClient.put(params).promise()

    if (!res) {
      throw Error(`There was an error inserting ID of ${data.ID} in table ${TableName}`)
    }
    return data
  },

  async delete(ID, TableName) {
    const params = {
      TableName,
      Key: {
        ID
      }
    }

    return await documentClient.delete(params).promise()
  }
}

module.exports = DynamoDB
