import cp from 'child_process'

export async function getMonkeyPosition (url) {
  const ls = cp.spawn('python', ['./python/MonkeyTracking.py', url])
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

export async function getStockShort (stockName) {
  const ls = cp.spawnSync('python', ['./python/script.py', stockName])
  if (ls.status !== 0) {
    const message = `
      ORIGINAL CMD: ${stockName}
      STDOUT: ${ls.stdout && ls.stdout.toString()}
      STDERR: ${ls.stderr && ls.stderr.toString()}
      STATUS: ${ls.status}
      ERROR: ${ls.error}
    `
    throw new Error(message)
  }
  return ls.stdout.toString()
}

// export function getStockDetails (stockName) {
//   const ls = cp.spawnSync('python', ['./python/script.py', stockName])
//   if (ls.status !== 0) {
//     const message = `
//       ORIGINAL CMD: ${stockName}
//       STDOUT: ${ls.stdout && ls.stdout.toString()}
//       STDERR: ${ls.stderr && ls.stderr.toString()}
//       STATUS: ${ls.status}
//       ERROR: ${ls.error}
//     `
//     throw new Error(message)
//   }
//   return ls.stdout.toString()
// }

export function getStockDetails (stockName) {
  const ls = cp.spawn('python', ['./python/script.py', stockName])
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
  const ls = cp.spawnSync('python', ['./python/script.py', searchQuery])
  if (ls.status !== 0) {
    const message = `
      ORIGINAL CMD: ${searchQuery}
      STDOUT: ${ls.stdout && ls.stdout.toString()}
      STDERR: ${ls.stderr && ls.stderr.toString()}
      STATUS: ${ls.status}
      ERROR: ${ls.error}
    `
    throw new Error(message)
  }
  return ls.stdout.toString()
}

export function testNodeCall (param) {
  const ls = cp.spawn('node', ['./python/support.js', param])
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
