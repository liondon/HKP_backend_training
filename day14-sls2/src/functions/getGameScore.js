const Responses = require('../functions/utils/API_Responses.js')
const DynamoDB = require('../functions/utils/DynamoDB')
const { withHooks } = require('../functions/utils/hooks')

const tableName = process.env.tableName

const handler = async event => {
  if (!event.queryStringParameters.game) {
    return Responses._400({ message: 'missing the game param from the path' })
  }
  const users = await DynamoDB.query({
    tableName,
    index: 'game-index',
    queryKey: 'game',
    queryVal: event.queryStringParameters.game
  })
  return Responses._200(users)
}

exports.handler = withHooks(handler)
