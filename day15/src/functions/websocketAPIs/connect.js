const Response = require('../utils/API_Responses')
const DynamoDB = require('../utils/DynamoDB')

const tableName = process.env.tableName

exports.handler = async event => {
  console.log('event', event)

  const { connectionId: connectionID, domainName, stage } = event.requestContext

  const data = {
    ID: connectionID,
    date: Date.now(),
    messages: [],
    domainName,
    stage
  }

  try {
    await DynamoDB.write(data, tableName)
  } catch (err) {
    console.log('Error in writing to Dynamo with websocket connectionID', err)
    return Response._500({ message: 'Error writing MyWebsocketUserTable' })
  }

  return Response._200({ message: 'connected' })
}
