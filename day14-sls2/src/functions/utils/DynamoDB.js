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

  async create(data, TableName) {
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

  update: async ({ tableName, primaryKey, primaryKeyVal, updateKey, updateVal }) => {
    // TODO: Q-why do we need the :updateVal placeholder?
    const params = {
      TableName: tableName,
      Key: { [primaryKey]: primaryKeyVal },
      UpdateExpression: `set ${updateKey} = :updateVal`,
      ExpressionAttributeValues: {
        ':updateVal': updateVal
      }
    }
    return await documentClient.update(params).promise()
  },

  query: async ({ tableName, index, queryKey, queryVal }) => {
    // TODO: Q-why do we need the :hkey placeholder?
    const params = {
      TableName: tableName,
      IndexName: index,
      KeyConditionExpression: `${queryKey} = :hkey`,
      ExpressionAttributeValues: {
        ':hkey': queryVal
      }
    }
    const res = await documentClient.query(params).promise()

    return res.Items || []
  }
}

module.exports = DynamoDB
