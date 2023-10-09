import Express from 'express'
import { Validator, ValidationError } from 'express-json-validator-middleware'
import queryMongoDatabase from '../data/mongoController.js'
import { validateEmail, deleteInvestor } from '../Middleware/generalServerFunctions.js'

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
  required: ['name', 'amount', 'price', 'userID'],
  properties: {
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
function isAuthenticated (req, res, next) { // Check if user is authenticated ------------------TO DO --------------------
  if (req.session.user) next()
  else next('route')
}
function isAdmin (req, res, next) { // Check if user is admin ------------------TO DO --------------------
  if (req.session.user === 'admin') next()
  else next('route')
}
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

dataRouter.get('/stocks/:name', (req, res) => { // Search Database for related stocks to search query, If cannot search API ------------------TO DO --------------------
  const stockName = parseInt(req.params.name) // this is a string
  // Search API for matching results.  ------------------TO DO --------------------
  // logic to return top 5 results from API

  // Start to a solution for searching database for stocks that will then be searched in API
  queryMongoDatabase(async db => {
    const data = await db.collection('Stock').find({ stockName })
    const numDocs = await db.collection('Stock').countDocuments({ stockName })
    if ((numDocs) === 0) {
      res.status(404).json({ error: true, message: `Stock: ${stockName} not found` })
    }
    for await (const doc of data) {
      res.json(doc)// search API for doc.name
    }
    if (Array.isArray(data) && data.length > 0) {
      res.json(data[0])
    } else {
      // Movie is not found
      res.status(404).json({ error: true, message: `Game ID ${stockName} not found` })
    }
  }, 'MonkeyBusinessWebApp')

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
        if (doc.password !== password) {
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
      res.json({
        error: false,
        message: `User: ${username} Logged In Successfully`
      })
    }
  }, 'MonkeyBusinessWebApp')
})
dataRouter.get('/logout', (req, res) => { // maybe POST to introdce authentication ------------------TO DO --------------------
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
})
dataRouter.post('/signup', validator.validate({ body: signupSchema }), (req, res) => { // working without authentication ------------------TO DO --------------------
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
      const adminID = null
      const preferencesID = '651dec44f8c800a5da81622b'
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
})
dataRouter.post('/stocks', validator.validate({ body: stockSchema }), (req, res) => { // working without authentication ------------------TO DO --------------------
  // need to add authentication to this route ------------------TO DO --------------------
  // user must be logged in to delete account
  // ie req.session.user must be equal to req.params.username
  // OR req.session.user must be an admin
  const stock = req.body
})
dataRouter.post('/monkey', validator.validate({ body: stockSchema }), (req, res) => { //
  // need to add authentication to this route ------------------TO DO --------------------
  // user must be logged in to delete account
  // ie req.session.user must be equal to req.params.username
  // OR req.session.user must be an admin
  const newGame = req.body
})

dataRouter.delete('/account/:username', (req, res) => {
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
})

// Make the router available to import in other files
export default dataRouter
