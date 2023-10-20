import Express from 'express'
import { validationErrorMiddleware, validator, loginSchema, signupSchema, stockSchema } from '../../middleware/validation.js'
import queryMongoDatabase from '../../data/mongoController.js'

import bcryptjs from 'bcrypt'
import jwt from 'jsonwebtoken'
import path from 'path'
import Dotenv from 'dotenv'

import { spawn, fork } from 'child_process'

import { getStocks, getInvestorStocks, searchForStock, getAllStocks, getUserStocks } from '../../services/stockServices.js'
import { login, signup, logout, updatePreferences, deleteUser } from '../../services/userServices.js'

Dotenv.config()

const dataRouter = new Express.Router()

dataRouter.use(validationErrorMiddleware)

dataRouter.get('/stocks/:search', searchForStock)

dataRouter.get('/stocks', getInvestorStocks)
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
