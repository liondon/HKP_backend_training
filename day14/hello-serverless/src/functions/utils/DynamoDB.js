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
  }
}

module.exports = DynamoDB
