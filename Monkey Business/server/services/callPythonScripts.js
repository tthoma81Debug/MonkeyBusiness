import cp from 'child_process'
import { get } from 'http'
import path from 'path'

export function getStockShort (stockName) {
  const ls = cp.fork(path.join(__dirname, 'script.py'), [stockName])
  ls.stdout.on('data', (data) => {
    console.log(`stdout: ${data}`)
  })
  ls.stderr.on('data', (data) => {
    console.error(`stderr: ${data}`)
  })
  ls.on('close', (code) => {
    console.log(`child process exited with code ${code}`)
  })
}

export function getStockDetails (stockName) {
  const ls = cp.fork(path.join(__dirname, 'script.py'), [stockName])
  ls.stdout.on('data', (data) => {
    console.log(`stdout: ${data}`)
  })
  ls.stderr.on('data', (data) => {
    console.error(`stderr: ${data}`)
  })
  ls.on('close', (code) => {
    console.log(`child process exited with code ${code}`)
  })
}

export function searchStockAPI (searchQuery) {
  const ls = cp.fork(path.join(__dirname, 'script.py'), [searchQuery])
  ls.stdout.on('data', (data) => {
    console.log(`stdout: ${data}`)
  })
  ls.stderr.on('data', (data) => {
    console.error(`stderr: ${data}`)
  })
  ls.on('close', (code) => {
    console.log(`child process exited with code ${code}`)
  })
}
