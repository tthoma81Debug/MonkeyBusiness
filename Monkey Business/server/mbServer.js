import Express from 'express'
import fs from 'fs'
import dataRouter from './api/mbRoutes.js'

const PORT = 3000
const app = new Express()

app.use(Express.json())

app.use((req, res, next) => {
  console.log(`${req.method} request at ${req.url}`)
  next()
})

app.post('/ping', (req, res) => {
  res.send('pong POST')
})

const rawJSON = fs.readFileSync('./server/api/gameDetails.json', { encoding: 'utf8' })
const allGames = JSON.parse(rawJSON)

// Statically serve the public folder
app.use(Express.static('./public'))

app.use('/api', dataRouter)

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`)
})
