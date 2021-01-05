'use strict'

module.exports.testValidate = async (event, context) => {
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: 'JWT Validation Succeed!'
    })
  }
}
