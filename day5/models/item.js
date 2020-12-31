const mongoose = require('mongoose')
const Schema = mongoose.Schema

// TODO: use `username` for simplicity, but `ref` should better be used with `_id`
// Learn more: https://mongoosejs.com/docs/populate.html
const itemSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  quantity: {
    type: Number,
    required: true
  },
  username: {
    type: String,
    ref: 'User',
    index: true,
    required: true
  }
})

module.exports = mongoose.model('Item', itemSchema)
