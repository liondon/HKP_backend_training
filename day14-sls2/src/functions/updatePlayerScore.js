const Responses = require('../functions/utils/API_Responses.js')
const DynamoDB = require('../functions/utils/DynamoDB')
const { HooksWithValidation } = require('../functions/utils/hooks')
const yup = require('yup')

const tableName = process.env.tableName

const bodySchema = yup.object().shape({
  score: yup.number().required()
})

const pathSchema = yup.object().shape({
  ID: yup.string().required()
})

const handler = async event => {
  const ID = event.pathParameters.ID
  const { score } = event.body

  const res = await DynamoDB.update({
    tableName,
    primaryKey: 'ID',
    primaryKeyVal: ID,
    updateKey: 'score',
    updateVal: score
  })
  console.log(res)

  return Responses._200({})
}

exports.handler = HooksWithValidation({ bodySchema, pathSchema })(handler)
