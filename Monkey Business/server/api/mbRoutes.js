import Express from 'express'
import fs from 'fs'
import { Validator, ValidationError } from 'express-json-validator-middleware'

import queryMongoDatabase from '../data/mongoController.js'

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
const gameSchema = {
  type: 'object',
  required: ['gameID', 'name', 'image', 'year', 'rating', 'publishers', 'numplayers', 'minAge', 'playtime', 'weight'],
  properties: {
    gameID: {
      type: 'integer'
    },
    name: {
      type: 'string'
    },
    image: {
      type: 'string'
    },
    year: {
      type: 'integer'
    },
    rating: {
      type: 'number'
    },
    publishers: {
      type: 'array',
      items: {
        type: 'string'
      }
    },
    numplayers: {
      type: 'integer'
    },
    minAge: {
      type: 'integer'
    },
    playtime: {
      type: 'integer'
    },
    weight: {
      type: 'number'
    },
    description: {
      type: 'string'
    }
  }
}

const rawJSON = fs.readFileSync('./server/api/gameDetails.json', { encoding: 'utf8' })
const allGames = JSON.parse(rawJSON)

function wait (ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

dataRouter.get('/stocks/:id', (req, res) => { // Search Database for related stocks to search query, If cannot search API ------------------TO DO --------------------
  const gameID = parseInt(req.params.id) // this is a string
  queryMongoDatabase(async db => {
    const data = await db.collection('gamedata').find({ gameID: gameID }).toArray()
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
})

dataRouter.post('/games', validator.validate({ body: gameSchema }), (req, res) => { // fs.writeFileSync('./server/gameDetails.json', JSON.stringify(allGames))
  const newGame = req.body
  let GAME_ID_EXISTS = false
  allGames.forEach((game) => {
    if (game.gameID === newGame.gameID) {
      GAME_ID_EXISTS = true
    }
  })
  if (!GAME_ID_EXISTS) {
    allGames.push(newGame)
    res.json({
      error: false,
      message: `Game ID ${newGame.gameID} Added`
    })
  } else {
    res.status(409).json({ error: true, message: `Game ID ${newGame.gameID} Already Exists` })
  }
})
dataRouter.post('/login', validator.validate({ body: loginSchema }), (req, res) => { // fs.writeFileSync('./server/gameDetails.json', JSON.stringify(allGames))
  const loginCredentials = req.body

  queryMongoDatabase(async db => {
    const loginSuccess = await db.collection('Users').findOne({ username: loginCredentials[0], password: loginCredentials[1] }).toArray()
    console.log(loginSuccess)
    if (Array.isArray(loginSuccess) && loginSuccess.length > 0) {
      // Function to set login state or token?? ------------------TO DO --------------------
    } else {
      // Login Failed
      res.status(404).json({ error: true, message: 'Username or Password could not be found.' })
    }
  }, 'Users')
})
dataRouter.post('/signup', validator.validate({ body: gameSchema }), (req, res) => { // Signup for new user ------------------TO DO --------------------
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
  }, 'Users')
})
dataRouter.post('/stocks', validator.validate({ body: gameSchema }), (req, res) => { // Add Stock to Database ------------------TO DO --------------------
  const newGame = req.body
  let GAME_ID_EXISTS = false
  allGames.forEach((game) => {
    if (game.gameID === newGame.gameID) {
      GAME_ID_EXISTS = true
    }
  })
  if (!GAME_ID_EXISTS) {
    allGames.push(newGame)
    res.json({
      error: false,
      message: `Game ID ${newGame.gameID} Added`
    })
  } else {
    res.status(409).json({ error: true, message: `Game ID ${newGame.gameID} Already Exists` })
  }
})
dataRouter.post('/monkey', validator.validate({ body: gameSchema }), (req, res) => { //
  const newGame = req.body
  let GAME_ID_EXISTS = false
  allGames.forEach((game) => {
    if (game.gameID === newGame.gameID) {
      GAME_ID_EXISTS = true
    }
  })
  if (!GAME_ID_EXISTS) {
    allGames.push(newGame)
    res.json({
      error: false,
      message: `Game ID ${newGame.gameID} Added`
    })
  } else {
    res.status(409).json({ error: true, message: `Game ID ${newGame.gameID} Already Exists` })
  }
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

dataRouter.delete('/account/:id', (req, res) => {
  const ID = parseInt(req.params.id) // this is a string
  queryMongoDatabase(async db => {
    const data = await db.collection('Users').deleteOne({ userID: ID })
    if (data.deletedCount === 1) {
      res.json({
        error: false,
        message: `User ID ${ID} Deleted`
      })
    } else {
      res.status(404).json({ error: true, message: `User ID ${ID} not found` })
    }
  }, 'Users')
})

// Make the router available to import in other files
export default dataRouter
