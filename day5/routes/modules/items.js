const express = require('express')
const jwt = require('jsonwebtoken')
const router = express.Router()

const Item = require('../../models/item')
const secret = 'Put the Secret in .env!!!' // TODO: include dotenv

router.post('/', async (req, res) => {
  const message = {}
  try {
    // get the parsed requirement body
    const { token, name, quantity } = req.body

    // [Error handling] check empty fields
    if (!token || !name || !quantity) {
      message.message = 'Error: Some required fields are missing!'
      return res.status(400).json(message)
    }

    // verify and decode the token
    req.decoded = jwt.verify(token, secret)

    // create a new item
    // TODO: how to handle duplicates?
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
  } catch (err) {
    console.log(err)
    // [Error handling] JWT varification failed
    if (err.name === 'JsonWebTokenError') {
      message.message = 'Error: JWT verification failed.'
      return res.status(401).json(message)
    } else {
      // TODO: what should be returned? 500?
    }
  }
})

router.delete('/:id', async (req, res) => {
  const _id = req.params.id
  const item = await Item.findOne({ _id })
  await item.remove()
  return res.status(204).end()
})

module.exports = router
