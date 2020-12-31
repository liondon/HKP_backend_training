const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const router = express.Router()

const User = require('../../models/user')
const secret = 'Put the Secret in .env!!!' // TODO: include dotenv

// TODO: confirm the convention of docstring
/* Login a User
 * This endpoint login a User based the data in the body that is posted */
router.post('/login', async (req, res) => {
  try {
    const message = {}
    const { username, password } = req.body

    // [Error handling] check empty fields
    if (!username || !password) {
      message.message = 'Error: Some required fields are missing!'
      return res.status(400).json(message)
    }

    // [Error handling] get user data from database & check if user exist
    const user = await User.findOne({ username })
    if (!user) {
      message.message = 'Error: username not found.'
      return res.status(400).json(message)
    }

    // [Error handling] check password
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      message.message = 'Error: Wrong password.'
      return res.status(400).json(message)
    }

    // assign token
    message.token = jwt.sign({ username }, secret, { expiresIn: '1d' })
    res.status(200).json(message)
  } catch (err) {
    console.log(err)
    // TODO: what should be returned? 500?
    res.status(500).end()
  }
})

// TODO: confirm the convention of docstring
/* Creates a User
 * This endpoint creates(signup) a User based the data in the body that is posted */
router.post('/create', async (req, res) => {
  try {
    const message = {}
    const { username, password } = req.body

    // [LOG-INFO] log the request body for debugging
    // TODO: is there a better logger that can handle different tags?
    console.log('Request to create(signup) user with following payload: ')
    console.log(req.body)

    // [Error handling] check empty fields
    if (!username || !password) {
      message.message = 'Error: Some required fields are missing!'
      return res.status(400).json(message)
    }

    // [Error handling] check if the username has been used
    const existingUser = await User.findOne({ username })
    if (existingUser) {
      message.message = 'Error: This username has been registered. Please try another one.'
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
    message.token = jwt.sign({ username }, secret, { expiresIn: '1d' })
    return res.status(201).json(message)
  } catch (err) {
    console.log(err)
    // TODO: what should be returned? 500?
    res.status(500).end()
  }
})

module.exports = router
