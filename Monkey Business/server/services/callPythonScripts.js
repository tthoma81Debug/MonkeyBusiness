import cp from 'child_process'

export async function getStockShort (stockNameArray) {
  const ls = cp.spawnSync('python', ['./python/GetStockInfo.py', stockNameArray])
  if (ls.status !== 0) {
    const message = `
      ORIGINAL CMD: ${stockNameArray}
      STDOUT: ${ls.stdout && ls.stdout.toString()}
      STDERR: ${ls.stderr && ls.stderr.toString()}
      STATUS: ${ls.status}
      ERROR: ${ls.error}
    `
    throw new Error(message)
  }
  return ls.stdout.toString()
}

export function getStockDetails (stockName, timeFrameMonths) {
  const ls = cp.spawnSync('python', ['./python/GetClosingPriceList.py', stockName, timeFrameMonths])
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

export function searchStockAPI (searchQuery, start, end) {
  const ls = cp.spawnSync('python', ['./python/StockSearchList.py', searchQuery, start, end])
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
