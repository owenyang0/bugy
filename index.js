import koa from 'koa'
import route from 'koa-route'
import parse from 'co-body'

import { insertATwitter
  , getAllTwitters
  , insertAWord
  , getRandomWords
} from './src/mongo'

var app = koa()


app.use(function *(next) {
  var start = new Date
  yield next
  var ms = new Date - start
  console.log('%s %s - %sms', this.method, this.url, ms)
})

app.use(function *(next) {
  this.type = 'application/json'
  yield next
})


app.use(route.get('/twitter', listTwitter))
app.use(route.post('/twitter', insertTwitter))

app.use(route.get('/words', listRandomWords))
app.use(route.post('/words', insertWords))


function *listTwitter () {
  this.body = yield getAllTwitters
}

function *insertTwitter () {
  try {
    let newTwitter = yield parse(this)
    this.body = yield insertATwitter(newTwitter)
  } catch(err) {
    this.throw(err, 500);
  }
}

function *listRandomWords () {
  this.body = yield getRandomWords
}

function *insertWords () {
  try {
    let newWord = yield parse(this)
    this.body = yield insertAWord(newWord)
  } catch(err) {
    this.throw(err, 500);
  }
}

var port = process.env.PORT || 3000
app.listen(port)
info()

function info () {
  console.log('server listening on port ', port)
}

export default app