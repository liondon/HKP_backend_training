const Response = require('../utils/API_Responses')
const DynamoDB = require('../utils/DynamoDB')
const WebSocket = require('../utils/WebSocket')
const tableName = process.env.tableName

exports.handler = async event => {
  console.log('event', event)

  const { connectionId: connectionID } = event.requestContext

  const body = JSON.parse(event.body)

  try {
    const record = await DynamoDB.get(connectionID, tableName)
    const { messages, domainName, stage } = record

    messages.push(body.message)

    const data = {
      ...record,
      messages
    }

    await DynamoDB.write(data, tableName)

    await WebSocket.send({ domainName, stage, connectionID, message: 'This is the reply.' })
    console.log('websocket sent message back.')

    return Response._200({ message: 'got a message' })
  } catch (err) {
    console.log('Error when receiving message', err)
    return Response._400({ message: 'message not received' })
  }
}
