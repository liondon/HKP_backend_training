const Responses = require('../functions/utils/API_Responses.js')
const DynamoDB = require('../functions/utils/DynamoDB')
const tableName = process.env.tableName

exports.handler = async event => {
  console.log('event', event)
  if (!event.pathParameters || !event.pathParameters.ID) {
    // failed without an ID... This path is not reached, actually.
    return Responses._400({ message: 'missing the ID query parameter' })
  }

  const ID = event.pathParameters.ID
  const data = JSON.parse(event.body)
  data.ID = ID

  try {
    const user = await DynamoDB.create(data, tableName)
    return Responses._200(user)
  } catch (err) {
    console.log('Error in DynamoDB create', err)
    return Responses._400({
      message: `Failed to create user by ID=${ID}`
    })
  }
}
