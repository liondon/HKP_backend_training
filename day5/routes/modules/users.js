const express = require('express')
const bcrypt = require('bcryptjs')
const router = express.Router()

const User = require('../../models/user')

router.post('/create', async (req, res) => {
  /* Creates a User
   * This endpoint creates(signup) a User based the data in the body that is posted
   */
  const message = {}
  const { username, password } = req.body

  // [INFO] log the request body
  // TODO: is there a better logger that can handle different tags?
  console.log('Request to create(signup) user with following payload: ')
  console.log(req.body)

  // check empty fileds (should/could be done at frontend)
  if (!username || !password) {
    message.Error = 'Some required fileds are missing!'
    return res.status(400).json(message)
  }

  // check if the username has been used
  const existingUser = await User.findOne({ username })
  if (existingUser) {
    message.Error = 'This username has been registered. Please try another one.'
    return res.status(400).json(message)
  }

  // create new user
  const hash = await bcrypt.hashSync(password, await bcrypt.genSaltSync(10))
  const user = await User.create({
    username,
    password: hash
  })
  console.log(`User with ID ${user._id} created.`)
  message.Location = `http://localhost:3000/users/${user._id}`
  return res.status(201).json(message)
})

module.exports = router
