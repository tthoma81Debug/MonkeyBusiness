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

export async function getStocksName (req, res) {
}

export async function getStocks (req, res) {
  // pull top 5 Stocks from API  ------------------TO DO --------------------
  const stockArray = getInvestorStockNames(req.session.username)
  const stockDataArray = []
  for (const stock of stockArray) {
    const stockData = getStockShort(stock)
    stockDataArray.push(stockData)
  }
}

export async function searchForStock (req, res) {
  // call python function to search API for stock
  // process and return data

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
export async function getInvestorStocks (req, res) {
  const username = req.session.username
  const userStocks = getInvestorStockNames(username)
  const userStockData = []
  for (const stock of userStocks) {
    const stockDataObject = getStockShort(stock)
    userStockData.push(stockDataObject)
  }
  res.json(userStockData)
}

export async function updateStockCount (req, res) {
  const username = req.body.username
  const stockName = req.body.stockName
  const stockPrice = req.body.stockPrice
  const changeAmount = req.body.changeAmount
  const changeType = req.body.changeType // Need a way to determine if the stock is being bought or sold. Could use a boolean or a string. I used a string. I would recommend against tryng to use negative signs, unnecessarily complex.

  queryMongoDatabase(async db => {
    // check if investor collection exists
    const data = await db.collection('Investor').findOne({ username }) // ------This function querys the database for the corresponding investor object and store it into the data variable
    if (data < 1) {
      res.status(404).json({ error: true, message: 'No Investor Found' })
    } else {
      // -----------------The best thing to do is to use the Investor Object you already queried from the database and use the array functions to find the stock you are looking for. This is more efficient and less code.-----------------
      if (changeType === 'sell') {
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
            res.status(404).json({ error: true, message: 'Not Enough Stocks To Sell' })
          } else if (changeAmount === foundStock[1]) {
            const nameDelete = await db.collection('Investor').updateOne({ username }, { $pull: { stocks: foundStock } })
            if (nameDelete.modifiedCount === null) {
              res.status(404).json({ error: true, message: 'Stock Could Not Be Removed' })
            } else {
              const newHistoryArray = [changeType, stockName, changeAmount]
              const histUpdate = db.collection('Investor').updateOne({ username }, { $push: { stockHistory: newHistoryArray } })
              if (histUpdate.modifiedCount === null) {
                res.status(404).json({ error: true, message: 'History Could Not Be Updated' })
              }
              res.json({ error: false, message: 'Stock Successfully Removed' })
            }
          } else {
            // handle the sale of stocks when changeAmount is < foundStock[1]
            const stockChange = await db.collection('Investor').updateOne({ username }, { $set: { [`stocks.${count}`]: [stockName, (foundStock[1] - changeAmount)], balance: data.balance + (changeAmount * stockPrice) } })
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
