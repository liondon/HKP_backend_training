const Responses = require('../functions/utils/API_Responses.js')
const S3 = require('../functions/utils/S3')
const bucketName = process.env.bucketName

exports.handler = async event => {
  console.log('event', event)
  if (!event.pathParameters || !event.pathParameters.fileName) {
    // failed without an ID... This path is not reached, actually.
    return Responses._400({ message: 'missing the fileName query parameter' })
  }

  const fileName = event.pathParameters.fileName
  const data = JSON.parse(event.body)

  try {
    const file = await S3.create(data, fileName, bucketName)
    return Responses._200(file)
  } catch (err) {
    console.log('Error in S3 create', err)
    return Responses._400({
      message: `Failed to create file by fileName=${fileName} in bucket=${bucketName}`
    })
  }
}
