const Response = require('../utils/API_Responses')

exports.handler = async event => {
  console.log('event', event)

  return Response._200({ message: 'default' })
}
