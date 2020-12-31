const express = require('express')
const router = express.Router()

const users = require('./modules/users')
const items = require('./modules/items')

router.use('/users', users)
router.use('/items', items)

module.exports = router
