const express = require('express')
const jwt = require('jsonwebtoken')
const router = express.Router()

const Item = require('../../models/item')
const secret = 'Put the Secret in .env!!!' // TODO: include dotenv

router.post('/', async (req, res) => {
  // get the parsed requirement body
  const { token, name, quantity } = req.body

  // verify and decode the token
  req.decoded = jwt.verify(token, secret)

  // create a new item
  const item = await Item.create({
    name,
    quantity,
    username: req.decoded.username
  })

  // construct the response
  const result = {
    _id: item._id,
    name: item.name,
    quantity: item.quantity,
    username: item.username
  }

  return res.status(201).json({ item: result })
})

module.exports = router
