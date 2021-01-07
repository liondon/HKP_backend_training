const Responses = require('./API_Responses.js')

exports.handler = async event => {
  console.log('event', event)
  if (!event.pathParameters || !event.pathParameters.ID) {
    // failed without an ID... This path is not reached, actually.
    return Responses._400({ message: 'missing the ID query parameter' })
  }

  const ID = event.pathParameters.ID
  if (data[ID]) {
    // return the data
    return Responses._200(data[ID])
  }

  // failed as ID not found in the data
  return Responses._400({ message: 'ID not found in data' })
}

const data = {
  123: { name: 'Ann', age: 12, job: 'student' },
  456: { name: 'Chris', age: 23, job: 'teacher' },
  789: { name: 'Tom', age: 65, job: 'journalist' }
}
