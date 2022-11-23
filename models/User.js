const {Schema, model} = require('mongoose')

const schema = new Schema({
  userName: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  email: {type: String, required: true},
  date: {type: String, required: true},
  lastDate: {type: String, required: true},
  state: {type: Boolean, required: true},
  block: {type: Boolean, required: true}
})

module.exports = model('User', schema)