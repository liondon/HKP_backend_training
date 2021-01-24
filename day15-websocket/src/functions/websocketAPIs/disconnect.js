const Response = require('../utils/API_Responses')
const DynamoDB = require('../utils/DynamoDB')

const tableName = process.env.tableName

exports.handler = async event => {
  console.log('event', event)

  const { connectionId: connectionID } = event.requestContext

  await DynamoDB.delete(connectionID, tableName)

  return Response._200({ message: 'disconnected' })
}
