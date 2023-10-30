import queryMongoDatabase from '../data/mongoController.js'
import { getStockShort, getStockDetails, searchStockAPI } from './callPythonScripts.js'

// ------------------------------------ Temp Stock Routes ------------------------------------
export async function getAllStocks (req, res) {
  // pull top 5 Stocks from API  ------------------TO DO --------------------
  queryMongoDatabase(async db => {
    const data = await db.collection('StocksTempAPI').find({ }, { projection: { _id: 0 } })
    if ((await db.collection('StocksTempAPI').countDocuments({})) === 0) {
      res.status(404).json({ error: true, message: 'No Stocks Found' })
    }
    const stockArray = []
    for await (const doc of data) {
      stockArray.push(doc)
    }
    res.json(stockArray)
  }, 'MonkeyBusinessWebApp')
}

export async function getUserStocks (req, res) {
  // pull top 5 Stocks from API  ------------------TO DO --------------------
  const username = req.params.username
  queryMongoDatabase(async db => {
    const data = await db.collection('Investor').find({ username })
    if ((await db.collection('Investor').countDocuments({ username })) < 1) {
      res.status(404).json({ error: true, message: 'No Investor Found' })
    }
    const userStocks = []
    for await (const doc of data) {
      for (const stock of doc.stocks) {
        const stockData = await db.collection('StocksTempAPI').findOne({ name: stock[0] }, { projection: { _id: 0 } })
        if (stockData === null) {
          res.status(404).json({ error: true, message: 'No Stocks Found' })
        }
        userStocks.push(stockData)
      }
      res.json(userStocks)
    }
  }, 'MonkeyBusinessWebApp')
}
// ------------------------------------ Temp Stock Routes ------------------------------------

export async function getStockInfo (req, res) {
  const stockName = req.body.stockName
  const timeFrameMonths = parseInt(req.body.timeFrameMonths)
  try {
    const stockData = await getStockDetails(stockName, timeFrameMonths)
    res.send(stockData)
  } catch (err) {
    console.log(err)
  }
}
export async function searchForStock (req, res) {
  // call python function to search API for stock
  // process and return data
  const searchQuery = req.params.search
  const start = req.body.start
  const end = req.body.end
  try {
    const stockData = await searchStockAPI(searchQuery, start, end)
    res.json(parseStockData(stockData))
  } catch (err) {
    console.log(err)
  }
}

function getInvestorStockNames (username) { // helper function to get investor stock names
  try {
    queryMongoDatabase(async db => {
      const data = await db.collection('Investor').findOne({ username })
      if ((data) < 1) {
        return ('Failed to find investor')
      }
      const userStocks = data.stocks
      return (userStocks)
    }, 'MonkeyBusinessWebApp')
  } catch (err) {
    console.log(err)
  }
}
export async function getInvestorStocks (req, res) {
  const username = req.session.username
  const userStocks = await getInvestorStockNames(username)
  const userStockData = await getStockShort(userStocks)
  res.json(userStockData)
}

function parseStockData (stockData) {
  // parse stock data
  // return parsed data

  const regex = /(?<=\[)(.*?)(?=\])/g
  const matches = String(stockData.match(regex))
  const data = matches.substring(1, matches.length - 1)
  const parsedData = data.split('\', \'')

  return (parsedData)
}
// /(?<=\[)(.*?)(?=\])/g
// /\[(.*?)\]/g

// /(?<=\[)(.*?)(?=\])/g

