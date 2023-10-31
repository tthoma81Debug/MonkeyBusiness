import cp from 'child_process'

export async function getStockShort (stockNameArray) {
  const ls = cp.spawn('python', ['./python/GetStockInfo.py', stockNameArray])
  return new Promise((resolve, reject) => {
    let stdoutData = ''
    let stderrData = ''

    ls.stdout.on('data', (data) => {
      stdoutData += data
    })

    ls.stderr.on('data', (data) => {
      stderrData += data
    })

    ls.on('error', (err) => {
      reject(err)
    })
    ls.on('close', (code) => {
      console.log(`child process exited with code ${code}`)
      if (code !== 0) {
        reject(new Error(`child process exited with code ${code}: ${stderrData}`))
      } else {
        resolve(stdoutData)
      }
    })
  })
}

export function getStockDetails (stockName, timeFrameMonths) {
  const ls = cp.spawn('python', ['./python/GetClosingPriceList.py', stockName, timeFrameMonths])
  return new Promise((resolve, reject) => {
    let stdoutData = ''
    let stderrData = ''

    ls.stdout.on('data', (data) => {
      stdoutData += data
    })

    ls.stderr.on('data', (data) => {
      stderrData += data
    })

    ls.on('error', (err) => {
      reject(err)
    })
    ls.on('close', (code) => {
      console.log(`child process exited with code ${code}`)
      if (code !== 0) {
        reject(new Error(`child process exited with code ${code}: ${stderrData}`))
      } else {
        resolve(stdoutData)
      }
    })
  })
}

export function searchStockAPI (searchQuery, start, end) {
  const ls = cp.spawn('python', ['./python/StockSearchList.py', searchQuery, start, end])
  return new Promise((resolve, reject) => {
    let stdoutData = ''
    let stderrData = ''

    ls.stdout.on('data', (data) => {
      stdoutData += data
    })

    ls.stderr.on('data', (data) => {
      stderrData += data
    })

    ls.on('error', (err) => {
      reject(err)
    })
    ls.on('close', (code) => {
      console.log(`child process exited with code ${code}`)
      if (code !== 0) {
        reject(new Error(`child process exited with code ${code}: ${stderrData}`))
      } else {
        resolve(stdoutData)
      }
    })
  })
}
