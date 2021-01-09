const Response = require('../utils/API_Responses')
const DynamoDB = require('../utils/DynamoDB')

const tableName = process.env.tableName

exports.handler = async event => {
  console.log('event', event)

  const { connectionId: connectionID } = event.requestContext

  const body = JSON.parse(event.body)

  try {
    const record = await DynamoDB.get(connectionID, tableName)
    const messages = record.messages

    messages.push(body.message)

    const data = {
      ...record,
      messages
    }

    await DynamoDB.write(data, tableName)
    return Response._200({ message: 'got a message' })
  } catch (err) {
    console.log('Error when receiving message', err)
    return Response._400({ message: 'message not received' })
  }
}
