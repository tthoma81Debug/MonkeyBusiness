import Express from 'express'
import dataRouter from './api/mbRoutes.js'
import mongoose from 'mongoose'
import Dotenv from 'dotenv'
import session from 'express-session'
//import passport from './config/passport.js'
import flash from 'connect-flash'
const MongoStore = require('connect-mongo')(session)
const PORT = 3000
const app = new Express()
Dotenv.config()
const DB_USER = process.env.DB_USER ?? 'unknown'
const DB_PASS = process.env.DB_PASS ?? 'unknown'

app.use(Express.json())

const dbString = `mongodb+srv://${DB_USER}:${DB_PASS}@monkeybusinesscluster.bkutl1e.mongodb.net/`
const dbOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true
}
const connection = mongoose.createConnection(dbString, dbOptions)
// Body Parser
app.use(Express.urlencoded({ extended: false }))

const sessionStore = new MongoStore({
  mongooseConnection: connection,
  collection: 'sessions'
})
// Express session
app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true,
  store: sessionStore,
  cookie: { secure: true, maxAge: 1000 * 60 * 60 * 24 }
}))
// Passport middleware
//app.use(passport.initialize())
//app.use(passport.session())
// Connect flash
app.use(flash())

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
