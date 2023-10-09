import Express from 'express'
import dataRouter from './api/mbRoutes.js'
import session from 'express-session'
import parseUrl from 'parseurl'
import escapeHtml from 'escape-html'
import genuuid from 'uid-safe'
//import MongoStore from 'connect-mongo'

const PORT = 3000
const app = new Express()
// -----------------------------SESSIONS----------------------------------------
let sess = {
  secret: 'secret-key',
  resave: false,
  saveUninitialized: true,
  cookie: {}
  // store: MongoStore.create({
  //   mongoUrl: 'mongodb://localhost:27017/MonkeyBusinessWebApp'
  // })
}
app.use(Express.json())
app.use(session(sess))
/*
if (app.get('env') === 'production') { // SETS COOKIES TO SECURE IN PRODUCTION, REQUIRED FOR HTTPS, HTTP will not work
  app.set('trust proxy', 1) // trust first proxy
  sess.cookie.secure = true // serve secure cookies
}
app.use(session({
  genid: function(req) {
    return genuuid() // use UUIDs for session IDs
  },
  secret: 'keyboard cat'
}))
*/

// -----------------------------SESSIONS----------------------------------------

app.use((req, res, next) => {
  console.log(`${req.method} request at ${req.url}`)
  next()
})
// Statically serve the public folder
app.use(Express.static('./public'))

app.use('/api', dataRouter)

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`)
})
