'use strict'
const jwt = require('jsonwebtoken')

// include environment variable from .env file
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

module.exports.validate = async (event, context) => {
  // API Gateway has included the JWT as event object
  const authorizerToken = event.authorizationToken
  const authorizerTokenArr = authorizerToken.split(' ')
  if (authorizerTokenArr.length !== 2 ||
    authorizerTokenArr[0] !== 'Bearer' ||
    authorizerTokenArr[1].length === 0) {
    return generatePolicy('undefined', 'Deny', event.methodArn)
  }
  const token = authorizerTokenArr[1]
  const decodedJwt = jwt.verify(token, process.env.JWT_SECRET)
  if (typeof decodedJwt.username !== 'undefined' &&
    decodedJwt.username.length > 0) {
    return generatePolicy(decodedJwt.username, 'Allow', event.methodArn)
  }

  return generatePolicy('undefined', 'Deny', event.methodArn)
}

// Help function to generate an IAM policy
/* NOTE: this code snippet is based on AWS API Gateway documentation: 
 *  https://docs.aws.amazon.com/apigateway/latest/developerguide/apigateway-use-lambda-authorizer.html#api-gateway-lambda-authorizer-lambda-function-create
 */
const generatePolicy = function (principalId, effect, resource) {
  let authResponse = {}

  authResponse.principalId = principalId
  if (effect && resource) {
    let policyDocument = {}
    policyDocument.Version = '2012-10-17'
    policyDocument.Statement = []
    let statementOne = {}
    statementOne.Action = 'execute-api:Invoke'
    statementOne.Effect = effect
    statementOne.Resource = resource
    policyDocument.Statement[0] = statementOne
    authResponse.policyDocument = policyDocument
  }

  // // Optional output with custom properties of the String, Number or Boolean type.
  // authResponse.context = {
  //   "stringKey": "stringval",
  //   "numberKey": 123,
  //   "booleanKey": true
  // };
  return authResponse
}
