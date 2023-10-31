import LocalStrategy from 'passport-local'
import bcryptjs from 'bcrypt'
import queryMongoDatabase from '../data/mongoController.js'
import { User } from './database.js'

export default async function initialize (passport) {
  const authenticateUser = async (username, password, done) => {
    queryMongoDatabase(async db => {
      const user = await db.collection('users').findOne({ username: username })
      if (!user) {
        return done(null, false, { message: 'No User Found' })
      }
      try {
        if (await bcryptjs.compare(password, user.password)) {
          return done(null, user)
        } else {
          return done(null, false, { message: 'Password Incorrect' })
        }
      } catch (e) {
        return done(e)
      }
    })
  }
  passport.use(
    new LocalStrategy({
      usernameField: 'username',
      passwordField: 'password'
    }, authenticateUser)
  )

  passport.serializeUser((user, done) => {
    done(null, user.id)
  })

  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      done(err, user)
    })
  })
}
