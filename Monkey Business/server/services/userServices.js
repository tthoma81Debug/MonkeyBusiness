import queryMongoDatabase from '../data/mongoController.js'
import { validateEmail, deleteInvestor } from '../middleware/generalServerFunctions.js'
import { ObjectId } from 'mongodb'

export function login (req, res) {
  const username = req.body.username
  const password = req.body.password

  queryMongoDatabase(async db => {
    const loginSuccess = await db.collection('Users').find({ username })
    const numDocs = await db.collection('Users').countDocuments({ username })
    if ((numDocs) === 0) {
      // Function to set login state or token?? ------------------TO DO --------------------
      res.status(404).json({ error: true, message: 'Username or Password could not be found.' })
    } else if (numDocs > 1) {
      res.status(500).json({ error: true, message: 'Multiple Users with same Username.' })
    } else {
      // Login Failed
      for await (const doc of loginSuccess) {
        const match = (password === doc.password) // await bcryptjs.compare(password, doc.password))
        if (match) {
          // const accessToken = jwt.sign({ username: username }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '30s' })
          // const refreshToken = jwt.sign({ username: username }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '1d' })
          // const otherUsers = "Array of other users' usernames, excluding current user"
          // const currentUser = { username, refreshToken }
          res.json({ error: false, message: `User: ${username} Logged In Successfully` })
        } else {
          res.status(404).json({ error: true, message: 'Username or Password could not be found.' })
        }
      }
      // req.session.regenerate(function (err) {
      //   if (err) next(err)
      //   req.session.user = username
      //   req.session.save(function (err) {
      //     if (err) return next(err)
      //     res.redirect('/')
      //   })
      // })
    }
  }, 'MonkeyBusinessWebApp')
}

export function signup (req, res) { // working without authentication ------------------TO DO --------------------
  const username = req.body.username
  const password = req.body.password
  const passwordConfirm = req.body.passwordConfirm
  const email = req.body.email

  queryMongoDatabase(async db => {
    const signupSuccess = await db.collection('Users').findOne({ username })

    if ((signupSuccess) !== null) {
      res.status(404).json({ error: true, message: 'Username Already Exists.' })
    } else {
      // Login Failed
      if (password !== passwordConfirm) {
        res.status(404).json({ error: true, message: 'Passwords do not match.' })
      } else if (validateEmail(email) === false) {
        res.status(404).json({ error: true, message: 'Invalid Email.' })
      }

      // Encrypt Password before database insertion ------------------TO DO --------------------
      // const encryptedPassword = bcryptjs.hash(password, 1)
      const adminID = null
      const preferencesID = new ObjectId('651dec44f8c800a5da81622b')
      // initialize new_investor
      const investorID = await db.collection('Investor').insertOne({ username, stocks: [], monkey: [] })
      if (investorID.insertedCount !== null) {
        const insertDoc = await db.collection('Users').insertOne({ username, password, email, preferencesID, adminID })
        if (insertDoc.insertedCount !== null) {
          res.json({ error: false, message: `User: ${username} Signed Up Successfully` })
        } else {
          res.status(404).json({ error: true, message: 'Failed to insert user info!' })
        }
      } else {
        res.status(404).json({ error: true, message: 'Failed to insert investor info!' })
      }

      // req.session.regenerate(function (err) {
      //   if (err) next(err)
      //   req.session.user = username
      //   req.session.save(function (err) {
      //     if (err) return next(err)
      //     res.redirect('/')
      //   })
      // })
    }
  }, 'MonkeyBusinessWebApp')
}

export function logout (next, req, res) { // maybe POST to introduce authentication ------------------TO DO --------------------
  // if authenticated, logout, else redirect to login page
  req.session.user = null
  req.session.save(function (err) {
    if (err) return next(err)
    req.session.regenerate(function (err) {
      if (err) next(err)
      res.redirect('/')
    }
    )
  })
  req.session.destroy(function (err) {
    if (err) return next(err)
    res.redirect('/')
  })
}

export function updatePreferences (req, res) {
  // turn parameters into variables
  const username = req.body.username // going to be session.user
  const colorScheme = req.body.colorScheme
  const graphColor = req.body.graphColor
  const fontSize = req.body.fontSize
  const query = { colorScheme, graphColor, fontSize }

  let newPrefId

  queryMongoDatabase(async db => {
    // check for matching set of preferences
    const foundPreferences = await db.collection('Preferences').findOne(query)

    if (foundPreferences === null) { // if no match, add new set to database
      const insert = await db.collection('Preferences').insertOne(query)
      if (insert.insertedCount === null) {
        res.status(404).json({ error: true, message: 'Failed to insert new preference set!' })
      } else {
        newPrefId = await db.collections('Preferences').findOne(query, { projection: { _id: 1, colorScheme: 0, graphColor: 0, fontSize: 0 } })
      }
    } else { // if match, get id of matching set
      newPrefId = foundPreferences._id
    }

    // update user's preference set with new id
    const updateDoc = {
      $set: {
        preferencesID: newPrefId
      }
    }
    const update = await db.collection('Users').updateOne({ username }, updateDoc)
    if (update.modifiedCount === null) {
      res.status(404).json({ error: true, message: 'Failed to update user preferences!' })
    } else {
      res.json({ error: false, message: 'Preferences Updated' })
    }
  }, 'MonkeyBusinessWebApp')
}

export function deleteUser (req, res) {
  // need to add authentication to this route ------------------TO DO --------------------
  // user must be logged in to delete account
  // ie req.session.user must be equal to req.params.username
  // OR req.session.user must be an admin
  const username = req.params.username

  queryMongoDatabase(async db => {
    const findAccount = await db.collection('Users').find({ username })
    const numDocs = await db.collection('Users').countDocuments({ username })
    if ((numDocs) === 0) {
      // Function to set login state or token?? ------------------TO DO --------------------
      res.status(404).json({ error: true, message: 'User could not be found.' })
    } else if (numDocs > 1) {
      res.status(500).json({ error: true, message: 'Multiple Users with same Username.' })
    } else {
      if (findAccount.investorID !== null) {
        deleteInvestor(username)
      }
      const data = await db.collection('Users').deleteOne({ username })
      if (data.deletedCount === 1) {
        res.json({
          error: false,
          message: `User ${username} Deleted`
        })
      } else {
        res.status(404).json({ error: true, message: `User ${username} not found` })
      }
    }
  }, 'MonkeyBusinessWebApp')
}
