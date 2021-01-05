'use strict'

module.exports.login = async (event, context) => {
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Success!'
    })
  }
}
