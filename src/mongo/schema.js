
var mongoose = require('mongoose')
var Schema = mongoose.Schema

var schema = new Schema({
  username: String,
  content: String,
  created_date: String
})

var Twitter = mongoose.model('Twitter', schema)

export default Twitter