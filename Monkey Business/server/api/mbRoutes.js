import Express from 'express'
import { Validator, ValidationError } from 'express-json-validator-middleware'

import queryMongoDatabase from '../data/mongoController.js'
import { parseString } from 'xml2js'

const dataRouter = new Express.Router()
const validator = new Validator({ allErrors: true })
const loginSchema = {
  type: 'object',
  required: ['username', 'password'],
  properties: {
    username: {
      type: 'string'
    },
    password: {
      type: 'string'
    }
  }
}
const signupSchema = {
  type: 'object',
  required: ['username', 'password', 'passwordConfirm', 'email'],
  properties: {
    username: {
      type: 'string'
    },
    password: {
      type: 'string'
    },
    passwordConfirm: {
      type: 'string'
    },
    email: {
      type: 'string'
    }
  }
}
const stockSchema = {
  type: 'object',
  required: ['stockID', 'name', 'amount', 'price', 'userID'],
  properties: {
    stockID: {
      type: 'integer'
    },
    name: {
      type: 'string'
    },
    amount: {
      type: 'integer'
    },
    price: {
      type: 'number'
    },
    userID: {
      type: 'integer'
    }
  }
}

function wait (ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}
function isAuthenticated (req, res, next) {
  if (req.session.user) next()
  else next('route')
}

dataRouter.get('/stocks/:id', (req, res) => { // Search Database for related stocks to search query, If cannot search API ------------------TO DO --------------------
  const gameID = parseInt(req.params.id) // this is a string
  queryMongoDatabase(async db => {
    const data = await db.collection('gamedata').find({ gameID }).toArray()
    console.log(data)
    if (Array.isArray(data) && data.length > 0) {
      res.json(data[0])
    } else {
      // Movie is not found
      res.status(404).json({ error: true, message: `Game ID ${gameID} not found` })
    }
  }, 'gamedata')

  // Otherwise Just Search API for matching results.  ------------------TO DO --------------------
})

dataRouter.get('/stocks', (req, res) => {
  // pull top 5 Stocks from API  ------------------TO DO --------------------
  queryMongoDatabase(async db => {
    const options = {
      sort: { name: 1 },
      projection: { _id: 0, name: 1 }
    }
    const data = await db.collection('Stock').find({}, options)
    if ((await db.collection('Stock').countDocuments({})) === 0) {
      res.status(404).json({ error: true, message: 'No Stocks Found' })
    }
    const stockArray = []
    for await (const doc of data) {
      stockArray.push(doc)
    }
    res.json(stockArray)
  }, 'MonkeyBusinessWebApp')
})


dataRouter.post('/login', validator.validate({ body: loginSchema }), Express.urlencoded({ extended: false }), (req, res) => {
  const username = req.body.username
  const password = req.body.password

  queryMongoDatabase(async db => {
    const loginSuccess = db.collection('Users').find({ username })
    const numDocs = await db.collection('Users').countDocuments({ username })
    if ((numDocs) === 0) {
      // Function to set login state or token?? ------------------TO DO --------------------
      res.status(404).json({ error: true, message: 'Username or Password could not be found.' })
    } else if (numDocs > 1) {
      res.status(500).json({ error: true, message: 'Multiple Users with same Username.' })
    } else {
      // Login Failed
      for await (const doc of loginSuccess) {
        if (doc.password !== password) {
          res.status(404).json({ error: true, message: 'Username or Password could not be found.' })
        }
      }
      req.session.regenerate(function (err) {
        if (err) next(err)
        req.session.user = username
        req.session.save(function (err) {
          if (err) return next(err)
          res.redirect('/')
        })
      })
      res.json({
        error: false,
        message: `User: ${username} Logged In Successfully`
      })
    }
  }, 'MonkeyBusinessWebApp')
})
dataRouter.get('/logout', (req, res) => {
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
})
dataRouter.post('/signup', validator.validate({ body: signupSchema }), (req, res) => { // Signup for new user ------------------TO DO --------------------
  const signupCredentials = req.body

  queryMongoDatabase(async db => {
    const signupSuccess = await db.collection('Users').findOne({ username: signupCredentials[0] }).toArray()
    console.log(signupSuccess)
    if (Array.isArray(signupSuccess) && signupSuccess.length > 0) {
      res.status(404).json({ error: true, message: 'Username Already Exists.' })
    } else {
      // Signup Success
      await db.collection('Users').insertOne({ username: signupCredentials[0], password: signupCredentials[1] })
      res.json({
        error: false,
        message: `User ${signupCredentials[0]} Added`
      })
    }
  }, 'MonkeyBusinessWebApp')
})
dataRouter.post('/stocks', validator.validate({ body: stockSchema }), (req, res) => { // Add Stock to Database ------------------TO DO --------------------
  const stock = req.body
})
dataRouter.post('/monkey', validator.validate({ body: stockSchema }), (req, res) => { //
  const newGame = req.body
})

dataRouter.use(validationErrorMiddleware)
function validationErrorMiddleware (err, req, res, next) {
  if (res.headersSent) {
    return next(err)
  }

  const isValidationError = err instanceof ValidationError
  if (!isValidationError) {
    return next(err)
  }
  res.status(400).json({ error: true, message: err.validationErrors })
  next()
}

dataRouter.delete('/account/:username', (req, res) => {
  const username = String(req.params.username) // this is a string
  //res.status(404).json({ error: true, message: `user info ${username}` }) I put this here to output the value of username to debug the code.
  queryMongoDatabase(async db => {
    const findAccount = db.collection('Users').find({ username })
    const numDocs = await db.collection('Users').countDocuments({ username })
    if ((numDocs) === 0) {
      // Function to set login state or token?? ------------------TO DO --------------------
      res.status(404).json({ error: true, message: 'User could not be found.' })
    } else if (numDocs > 1) {
      res.status(500).json({ error: true, message: 'Multiple Users with same Username.' })
    } else {
      const data = await db.collection('Users').deleteOne({ username: username })
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
})

// Make the router available to import in other files
export default dataRouter
