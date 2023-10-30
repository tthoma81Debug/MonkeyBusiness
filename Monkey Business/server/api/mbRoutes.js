import Express from 'express'
import { validationErrorMiddleware, validator, loginSchema, signupSchema, stockSchema, monkeySchema } from './../middleware/validation.js'
import { updateMonkey, getMonkeyInvestments, getMonkeyStocks, getMonkeyHistory } from './../services/monkeyServices.js'
import { getStockInfo, getInvestorStocks, searchForStock, getAllStocks, getUserStocks } from './../services/stockServices.js'
import { login, signup, logout, updatePreferences, deleteUser } from './../services/userServices.js'
import { changeAccount } from '../services/accountServices.js'
import { isAdmin, isAuthenticated } from '../middleware/authentication.js'
import passport from 'passport'
const dataRouter = new Express.Router()

dataRouter.use(validationErrorMiddleware)

// ------------------------------------ Stock Routes ------------------------------------
dataRouter.get('/stocks/:search', searchForStock) // anyone can access * with restrictions to prevent abuse
dataRouter.get('/stocks', isAuthenticated, getInvestorStocks) // corresponding user can get their stocks
dataRouter.post('/stocks', getStockInfo)

// ------------------------------------ Temp Stock Routes ------------------------------------
dataRouter.get('/stocksTemp/:username', getUserStocks)
dataRouter.get('/stocksTemp', getAllStocks)

// ------------------------------------ User Routes ------------------------------------
dataRouter.post('/login', validator.validate({ body: loginSchema }), Express.urlencoded({ extended: false }), (req, res) => {passport.authenticate('local', {
  successRedirect: '/home',
  failureRedirect: '/login',
  failureFlash: true
})
}, login) // open
dataRouter.get('/logout', logout) // open to only logged in users
dataRouter.post('/signup', validator.validate({ body: signupSchema }), signup) // open
dataRouter.delete('/account/:username', isAuthenticated, deleteUser) // corresponding user or admin can delete account
dataRouter.post('/account', isAuthenticated, changeAccount)
dataRouter.post('/preferences', isAuthenticated, updatePreferences) // corresponding user can update preferences

// ------------------------------------ Monkey Routes ------------------------------------
dataRouter.post('/monkey', validator.validate({ body: monkeySchema }), updateMonkey) // corresponding user can update monkey
dataRouter.get('/monkey', getMonkeyInvestments) // corresponding user can get monkey investments

// Make the router available to import in other files
export default dataRouter
