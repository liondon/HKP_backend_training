const Response = require('../utils/API_Responses')
const DynamoDB = require('../../../../day14/src/functions/utils/DynamoDB')

const tableName = process.env.tableName

exports.handler = async event => {
  console.log('event', event)

  const { connectionId: connectionID } = event.requestContext

  const data = {
    ID: connectionID,
    date: Date.now(),
    messages: []
  }

  await DynamoDB.write(data, tableName)

  return Response._200({ message: 'connected' })
}
