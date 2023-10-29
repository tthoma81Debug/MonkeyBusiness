import Express from 'express'
import dataRouter from './api/mbRoutes.js'
import { testNodeCall, getStockShort, getStockDetails, searchStockAPI } from './services/callPythonScripts.js'
import { testLogin } from './controllers/loginController.js'

const PORT = 3000
const app = new Express()

app.use(Express.json())

app.use((req, res, next) => {
  console.log(`${req.method} request at ${req.url}`)
  next()
})
// Statically serve the public folder
app.use(Express.static('./public'))

app.use('/api', dataRouter)

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`)
})
// const temp = getStockDetails('AAPL')
// console.log(temp)

// testLogin()
