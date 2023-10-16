import Express from 'express'
import { validationErrorMiddleware, validator, loginSchema, signupSchema, stockSchema } from '../../middleware/validation.js'
import queryMongoDatabase from '../../data/mongoController.js'

import bcryptjs from 'bcrypt'
import jwt from 'jsonwebtoken'
import path from 'path'
import Dotenv from 'dotenv'

import { spawn, fork } from 'child_process'

import { getAllStocks, getUserStocks } from '../../services/stockServices.js'
import { login, signup, logout, updatePreferences, deleteUser } from '../../services/userServices.js'

Dotenv.config()

const dataRouter = new Express.Router()

dataRouter.use(validationErrorMiddleware)

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
  const ls = fork('node_modules/python', ['script.py'])//, 'arg1', 'arg2']) // call python script to get top 5 stocks
  ls.stdout.on('data', (data) => {
    console.log(`stdout: ${data}`)
  })
  ls.stderr.on('data', (data) => {
    console.error(`stderr: ${data}`)
  })
  ls.on('close', (code) => {
    console.log(`child process exited with code ${code}`)
  })

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
dataRouter.get('/stocksTemp/:username', getUserStocks)
dataRouter.get('/stocksTemp', getAllStocks)

dataRouter.post('/login', validator.validate({ body: loginSchema }), Express.urlencoded({ extended: false }), login)
dataRouter.get('/logout', logout)
dataRouter.post('/signup', validator.validate({ body: signupSchema }), signup)
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

dataRouter.delete('/account/:username', deleteUser)

dataRouter.post('/update', updatePreferences)

// Make the router available to import in other files
export default dataRouter
