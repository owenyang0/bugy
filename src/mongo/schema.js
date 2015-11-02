
var mongoose = require('mongoose')
var random = require('mongoose-simple-random')
var Schema = mongoose.Schema

const schema = new Schema({
  username: String,
  content: String,
  created_date: String
})

const word = new Schema({
  word: String,
  phonetic_us: String,
  phonetic_uk: String,
  paraphrase: String,
  created_date: String
})
word.plugin(random)

export const Twitter = mongoose.model('Twitter', schema)
export const Word = mongoose.model('Word', word)
