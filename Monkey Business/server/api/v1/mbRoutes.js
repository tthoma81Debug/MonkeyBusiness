import Express from 'express'
import { validationErrorMiddleware, validator, loginSchema, signupSchema, stockSchema, monkeySchema } from '../../middleware/validation.js'

import { updateMonkey, getMonkeyInvestments, getMonkeyStocks, getMonkeyHistory } from '../../services/monkeyServices.js'
import { getStocks, getInvestorStocks, searchForStock, getAllStocks, getUserStocks } from '../../services/stockServices.js'
import { login, signup, logout, updatePreferences, deleteUser } from '../../services/userServices.js'

const dataRouter = new Express.Router()

dataRouter.use(validationErrorMiddleware)

// ------------------------------------ Stock Routes ------------------------------------
dataRouter.get('/stocks/:search', searchForStock)
dataRouter.get('/stocks', getInvestorStocks)

// ------------------------------------ Temp Stock Routes ------------------------------------
dataRouter.get('/stocksTemp/:username', getUserStocks)
dataRouter.get('/stocksTemp', getAllStocks)

// ------------------------------------ User Routes ------------------------------------
dataRouter.post('/login', validator.validate({ body: loginSchema }), Express.urlencoded({ extended: false }), login)
dataRouter.get('/logout', logout)
dataRouter.post('/signup', validator.validate({ body: signupSchema }), signup)
dataRouter.delete('/account/:username', deleteUser)
dataRouter.post('/preferences', updatePreferences)

// ------------------------------------ Monkey Routes ------------------------------------
dataRouter.post('/monkey', validator.validate({ body: monkeySchema }), updateMonkey)
dataRouter.get('/monkey', getMonkeyInvestments)

// Make the router available to import in other files
export default dataRouter
