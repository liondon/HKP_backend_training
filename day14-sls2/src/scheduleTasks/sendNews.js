const AWS = require('aws-sdk')
const Responses = require('../functions/utils/API_Responses')

const SES = new AWS.SES()

exports.handler = async event => {
  console.log('event', event)

  const emailHTML = '<h1>NEWS</h1>'

  const params = {
    Destination: {
      ToAddresses: ['liondonaugust810810@gmail.com']
    },
    Message: {
      Body: {
        Html: { Data: emailHTML }
      },
      Subject: { Data: 'Morning Tech News' }
    },
    Source: 'liondonaugust810810@gmail.com'
  }

  try {
    await SES.sendEmail(params).promise()
    return Responses._200({ message: 'email sent' })
  } catch (err) {
    console.log('error', err)
    return Responses._400({ message: 'failed to send the email' })
  }
}
