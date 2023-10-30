import queryMongoDatabase from '../data/mongoController.js'
import { validateEmail } from '../middleware/generalServerFunctions.js'
import { hashPassword } from '../controllers/signupController.js'
import { comparePasswords } from '../controllers/loginController.js'

// change password - requires password

// forgot password - send to email

// change username - requires password

// change email - requires password

export async function changeAccount (req, res) {
  const username = req.session.username
  const password = req.body.password
  const changeType = req.body.changeType
  if (changeType === 'password') {
    const newPassword = req.body.newPassword
    const newPasswordConfirm = req.body.newPasswordConfirm
    if (newPassword !== newPasswordConfirm) {
      res.status(404).json({ error: true, message: 'Passwords do not match.' })
    } else {
      queryMongoDatabase(async db => {
        const user = await db.collection('Users').findOne({ username })
        if (user === null) {
          res.status(404).json({ error: true, message: 'User does not exist.' })
        } else {
          const passwordMatch = await comparePasswords(password, user.password)
          if (passwordMatch === false) {
            res.status(404).json({ error: true, message: 'Incorrect Password.' })
          } else {
            const hashedPassword = await hashPassword(newPassword)
            const updateDoc = await db.collection('Users').updateOne({ username }, { $set: { password: hashedPassword } })
            if (updateDoc.modifiedCount !== null) {
              res.json({ error: false, message: `User: ${username} Updated Successfully` })
            } else {
              res.status(404).json({ error: true, message: 'Failed to update user info!' })
            }
          }
        }
      }, 'MonkeyBusinessWebApp')
    }
  } else if (changeType === 'username') {
    const newUsername = req.body.newUsername
    queryMongoDatabase(async db => {
      const user = await db.collection('Users').findOne({ username })
      if (user === null) {
        res.status(404).json({ error: true, message: 'User does not exist.' })
      } else {
        const passwordMatch = await comparePasswords(password, user.password)
        if (passwordMatch === false) {
          res.status(404).json({ error: true, message: 'Incorrect Password.' })
        } else {
          const updateDoc = await db.collection('Users').updateOne({ username }, { $set: { username: newUsername } })
          if (updateDoc.modifiedCount !== null) {
            res.json({ error: false, message: `User: ${username} Updated Successfully` })
          } else {
            res.status(404).json({ error: true, message: 'Failed to update user info!' })
          }
        }
      }
    }, 'MonkeyBusinessWebApp')
  } else if (changeType === 'email') {
    const newEmail = req.body.newEmail
    queryMongoDatabase(async db => {
      const user = await db.collection('Users').findOne({ username })
      if (user === null) {
        res.status(404).json({ error: true, message: 'User does not exist.' })
      } else {
        const passwordMatch = await comparePasswords(password, user.password)
        if (passwordMatch === false) {
          res.status(404).json({ error: true, message: 'Incorrect Password.' })
        } else {
          if (validateEmail(newEmail) === false) {
            res.status(404).json({ error: true, message: 'Invalid Email.' })
          } else {
            const updateDoc = await db.collection('Users').updateOne({ username }, { $set: { email: newEmail } })
            if (updateDoc.modifiedCount !== null) {
              res.json({ error: false, message: `User: ${username} Updated Successfully` })
            } else {
              res.status(404).json({ error: true, message: 'Failed to update user info!' })
            }
          }
        }
      }
    }, 'MonkeyBusinessWebApp')
  } else {
    res.status(404).json({ error: true, message: 'Invalid Change Type.' })
  }
}

export async function forgotEmail (req, res) {
  const username = req.session.username
  const email = req.body.email
  queryMongoDatabase(async db => {
    const user = await db.collection('Users').findOne({ username })
    if (user === null) {
      res.status(404).json({ error: true, message: 'User does not exist.' })
    } else {
      if (email !== user.email) {
        res.status(404).json({ error: true, message: 'Incorrect Email.' })
      } else {
        // send email to user with link to change password
        res.json({ error: false, message: `Email sent to ${email}` })
      }
    }
  }, 'MonkeyBusinessWebApp')
}
