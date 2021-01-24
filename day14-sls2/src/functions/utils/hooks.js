const { useHooks, logEvent, parseEvent, handleUnexpectedError } = require('lambda-hooks')

const withHooks = useHooks({
  before: [logEvent, parseEvent],
  after: [],
  onError: [handleUnexpectedError]
})

const HooksWithValidation = ({ bodySchema, pathSchema }) => {
  return useHooks({
    before: [logEvent, parseEvent, validateEventBody, validatePathParams],
    after: [],
    onError: [handleUnexpectedError]
  }, {
    bodySchema,
    pathSchema
  })
}

const validateEventBody = async state => {
  const { bodySchema } = state.config

  if (!bodySchema) {
    throw Error('missing required bodySchema')
  }

  try {
    const { event } = state
    await bodySchema.validate(event.body, { strict: true })
  } catch (err) {
    console.log('yup validation error of event.body', err)
    state.exit = true
    state.response = { statusCode: 400, body: JSON.stringify({ error: err.message }) }
  }
  return state
}

const validatePathParams = async state => {
  const { pathSchema } = state.config

  if (!pathSchema) {
    throw Error('missing required pathSchema')
  }

  try {
    const { event } = state
    await pathSchema.validate(event.pathParameters, { strict: true })
  } catch (err) {
    console.log('yup validation error of event.pathParameters', err)
    state.exit = true
    state.response = { statusCode: 400, body: JSON.stringify({ error: err.message }) }
  }
  return state
}

module.exports = {
  withHooks,
  HooksWithValidation
}
