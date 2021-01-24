const Responses = require('../functions/utils/API_Responses.js')
const DynamoDB = require('../functions/utils/DynamoDB')
const withHooks = require('../functions/utils/hooks')

const tableName = process.env.tableName

const handler = async event => {
  if (!event.pathParameters.ID) {
    // failed without an ID... This path is not reached, actually.
    return Responses._400({ message: 'missing the ID query parameter' })
  }

  const ID = event.pathParameters.ID
  const data = event.body
  data.ID = ID

  const user = await DynamoDB.create(data, tableName)
  if (!user) {
    return Responses._400({
      message: `Failed to create user by ID=${ID}`
    })
  }
  return Responses._200(user)
}

exports.handler = withHooks(handler)
