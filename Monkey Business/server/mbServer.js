import Express from 'express'
import fs from 'fs'
import dataRouter from './api/mbRoutes.js'
import cp from 'child_process'

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

//const spawn = require('child_process').spawn;
const ls = cp.spawn('python', ['./python/monkeytracking.py']);

ls.stdout.on('data', (data) => {
  console.log(`stdout: ${data}`);
});

ls.stderr.on('data', (data) => {
  console.log(`stderr: ${data}`);
});

ls.on('close', (code) => {
  //console.log(`child process exited with code ${code}`);
});