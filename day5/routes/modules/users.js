const express = require('express')
const bcrypt = require('bcryptjs')
const router = express.Router()

const User = require('../../models/user')

router.post('/create', async (req, res) => {
  /* Creates a User
   * This endpoint creates(signup) a User based the data in the body that is posted 
   */

  // [INFO] log the request body
  console.log('Request to create(signup) user with following payload: ')
  console.log(req.body)

  const { username, password } = req.body
  const message = {}
  const hash = await bcrypt.hashSync(password, await bcrypt.genSaltSync(10))
  const user = await User.create({
    username,
    password: hash
  })
  message.Location = `http://localhost:3000/users/${user._id}`

  return res.status(201).json(message)
})

module.exports = router
