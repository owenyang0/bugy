import koa from 'koa'
import route from 'koa-route'
import parse from 'co-body'

import { insertATwitter
  , getAllTwitters } from './src/mongo'

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


app.use(route.get('/', list))
app.use(route.post('/twitter', insert))


function *list () {
  this.body = yield getAllTwitters
}

var t = {
  username: 'owenyang',
  content: 'fk the world'
}

function *insert () {
  try {
    let newTwitter = yield parse(this)
    this.body = yield insertATwitter(newTwitter)
  } catch(err) {
    this.throw(err, 500);
  }
}

app.listen(3000)

export default app