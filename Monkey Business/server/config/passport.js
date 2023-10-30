//import LocalStrategy from 'passport-local'
//import bcrypt from 'bcryptjs'
//import queryMongoDatabase from '../data/mongoController'


// export default function (passport) {
//   passport.use(
//     new LocalStrategy({ usernameField: 'username' }, (username, password, done) => {
//       // Match User
//       User.findOne({ username: username }).then(user => {
//         if (!user) {
//           return done(null, false, { message: 'No User Found' })
//         }

//         bcrypt.compare(password, user.password, (err, isMatch) => {
//           if (err) throw err
//           if (isMatch) {
//             return done(null, user)
//           } else {
//             return done(null, false, { message: 'Password Incorrect' })
//           }
//         }).catch(err => console.log(err))
//       })
//     }
//     )
//   )

//   passport.serializeUser((user, done) => {
//     done(null, user.id)
//   })

//   passport.deserializeUser((id, done) => {
//     User.findById(id, (err, user) => {
//       done(err, user)
//     })
//   })
// }
