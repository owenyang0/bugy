
import mongoose from 'mongoose'

import { Twitter, Word } from './schema'

mongoose.connect('mongodb://localhost/test')

var db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error!'))
db.once('open', function (callback) {
   console.log("Connected correctly to server.");
})

export function insertATwitter (twitter) {
  return function (cb) {
    var tw = new Twitter(twitter)
    tw.created_date = Date.now()

    tw.save (function (err) {
      if (!err) {
        console.log('new twitter added!')
        cb(null, tw)
      }
    })
  }
}

export function getAllTwitters (cb) {
  var query = Twitter.find()
  query.exec(function (err, docs) {
    console.log(err)
    if (!err) {
      console.log('all twitters', docs)
      cb(null, docs)
    }
  })
}

export function insertAWord (word) {
  return function (cb) {
    var wd = new Word(word)
    wd.created_date = Date.now()

    wd.save (function (err) {
      console.log(err)
      if (!err) {
        console.log('new word added | ', word.word)
        cb(null, wd)
      }
    })
  }
}

export function getRandomWords (limit = 10) {
  return function (cb) {
    Word.findRandom({}, {}, {limit: limit}, function (err, docs) {
      if (!err) {
        console.log('random words | ', docs)
        cb(null, docs)
      }
    })
  }
}