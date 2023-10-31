import queryMongoDatabase from '../data/mongoController.js'
import { getStockShort, getStockDetails, searchStockAPI } from './callPythonScripts.js'

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


function getInvestorStockNames (username) {
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
function parseStockData (stockData) {
  // parse stock data
  // return parsed data

  const regex = /(?<=\[)(.*?)(?=\])/g
  const matches = String(stockData.match(regex))
  const data = matches.substring(1, matches.length - 1)
  const parsedData = data.split('\', \'')

  return (parsedData)
}
export async function getInvestorStocks (req, res) {
  const username = req.session.username
  const userStocks = await getInvestorStockNames(username)
  const userStockData = await getStockShort(userStocks)
  res.json(userStockData)
}

export async function updateStockCount (req, res) {
  const username = req.body.username
  const stockName = req.body.stockName
  const stockPrice = req.body.stockPrice
  const changeAmount = req.body.changeAmount
  const changeType = req.body.changeType

  queryMongoDatabase(async db => {
    // check if investor collection exists
    const data = await db.collection('Investor').findOne({ username })
    if (data < 1) {
      res.status(404).json({ error: true, message: 'No Investor Found' })
    } else {
      if (changeType === 'sell') {
        // handle the sale of stocks
        let foundStock = null
        let count = 0
        for (const stock of data.stocks) {
          if (stock[0] === stockName) {
            foundStock = stock
            break
          }
          count++
        }
        if (foundStock === null) {
          res.status(404).json({ error: true, message: 'Stock Not Found' })
        } else {
          if (changeAmount > foundStock[1]) {
            // error if selling more stocks than owned
            res.status(404).json({ error: true, message: 'Not Enough Stocks To Sell' })
          } else if (changeAmount === foundStock[1]) {
            // remove stock if selling same amount of stocks owned
            const nameDelete = await db.collection('Investor').updateOne(
              { username },
              { $pull: { stocks: foundStock }, $set: { balance: data.balance + (changeAmount * stockPrice) } }
            )
            if (nameDelete.modifiedCount === null) {
              res.status(404).json({ error: true, message: 'Stock Could Not Be Removed' })
            } else {
              const newHistoryArray = [changeType, stockName, changeAmount]
              const histUpdate = db.collection('Investor').updateOne(
                { username },
                { $push: { stockHistory: newHistoryArray } }
              )
              if (histUpdate.modifiedCount === null) {
                res.status(404).json({ error: true, message: 'History Could Not Be Updated' })
              }
              res.json({ error: false, message: 'Stock Successfully Removed' })
            }
          } else {
            // update amout of stocks in db otherwise
            const stockChange = await db.collection('Investor').updateOne(
              { username },
              { $set: { [`stocks.${count}`]: [stockName, (foundStock[1] - changeAmount)], balance: data.balance + (changeAmount * stockPrice) } })
            if (stockChange.modifiedCount === null) {
              res.status(404).json({ error: true, message: 'Stock Could Not Be Updated' })
            } else {
              const newHistoryArray = [changeType, stockName, changeAmount]
              const histUpdate = db.collection('Investor').updateOne({ username }, { $push: { stockHistory: newHistoryArray } })
              if (histUpdate.modifiedCount === null) {
                res.status(404).json({ error: true, message: 'History Could Not Be Updated' })
              }
              res.json({ error: false, message: 'Stock Successfully Updated' })
            }
          }
        }
      } else if (changeType === 'buy') {
      // handle the purchase of stocks
        if (changeAmount * stockPrice > data.balance) {
          // error if user doesn't have enough funds to buy stock
          res.status(404).json({ error: true, message: 'Not Enough Money To Buy' })
        } else {
          let foundStock = null
          let count = 0
          for (const stock of data.stocks) {
            if (stock[0] === stockName) {
              foundStock = stock
              break
            }
            count++
          }
          if (foundStock === null) {
            // push to stocks array if purchasing new stock
            const stockInsert = await db.collection('Investor').updateOne({ username }, { $push: { stocks: [stockName, changeAmount] }, $set: { balance: (data.balance - (changeAmount * stockPrice)) } })
            if (stockInsert.modifiedCount === null) {
              res.status(404).json({ error: true, message: 'Stock Could Not Be Added' })
            } else {
              const newHistoryArray = [changeType, stockName, changeAmount]
              const histUpdate = db.collection('Investor').updateOne({ username }, { $push: { stockHistory: newHistoryArray } })
              if (histUpdate.modifiedCount === null) {
                res.status(404).json({ error: true, message: 'History Could Not Be Updated' })
              }
              res.json({ error: false, message: 'Stock Successfully Added' })
            }
          } else {
            // update stock amount otherwise
            const stockChange = await db.collection('Investor').updateOne({ username }, { $set: { [`stocks.${count}`]: [stockName, (foundStock[1] + changeAmount)], balance: (data.balance - (changeAmount * stockPrice)) } })
            if (stockChange.modifiedCount === null) {
              res.status(404).json({ error: true, message: 'Stock Could Not Be Updated' })
            } else {
              const newHistoryArray = [changeType, stockName, changeAmount]
              const histUpdate = db.collection('Investor').updateOne({ username }, { $push: { stockHistory: newHistoryArray } })
              if (histUpdate.modifiedCount === null) {
                res.status(404).json({ error: true, message: 'History Could Not Be Updated' })
              }
              res.json({ error: false, message: 'Stock Successfully Updated' })
            }
          }
        }
      }
    }
  }, 'MonkeyBusinessWebApp')
}
