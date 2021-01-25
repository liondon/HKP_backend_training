const Responses = require('../functions/utils/API_Responses')
const fileType = require('file-type')
const { v4: uuid } = require('uuid')
const AWS = require('aws-sdk')

const s3 = new AWS.S3()

const allowedMimes = ['image/jpeg', 'image/png', 'image/jpg']

exports.handler = async event => {
  try {
    console.log('event', event)
    const body = JSON.parse(event.body)

    if (!body || !body.image || !body.mime) {
      return Responses._400({ message: 'incorrect body on request' })
    }

    if (!allowedMimes.includes(body.mimes)) {
      return Responses._400({ message: 'mime not allowed' })
    }
    let imageData = body.image
    if (body.image.substr(0, 7) === 'base64') {
      imageData = body.image.substr(7, body.image.length)
    }

    const buffer = Buffer.from(imageData, 'base64')
    const fileInfo = await fileType.fromBuffer(buffer)
    const detecedExt = fileInfo.ext
    const detectedMime = fileInfo.mime

    if (detectedMime !== body.mime) {
      return Responses._400({ message: 'mime type don\'t match' })
    }

    const name = uuid()
    const key = `${name}.${detecedExt}`

    console.log(`writing image ${key} to bucket `)
    await s3.putObject({
      Body: buffer,
      Key: key,
      ContentType: body.mime,
      Bucket: process.env.binaryImgBucket,
      ACL: 'public-read'
    }).promise()

    const url = `https://${process.env.binaryImgBucket}.s3-${process.env.region}.amazonaws.com/${key}`
    return Responses._200({
      imageURL: url
    })
  } catch (err) {
    console.log('error', err)
    return Responses._400({ message: err.message || 'failed to upload image' })
  }
}
