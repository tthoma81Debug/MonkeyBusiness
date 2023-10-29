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
  const changeAmount = req.body.changeAmount
 
  queryMongoDatabase(async db => {
    //check if investor collection exists
    const data = await db.collection('Investor').findOne({ username })
    console.log("investor: " + data)
    if (data < 1) {
      res.status(404).json({ error: true, message: 'No Investor Found' })
    }
    //check if stock already exists in investor array
    const foundStock = await db.collection('Investor').findOne(
      { username, stockNames : {$in:[stockName]} },
      { projection: { _id:0, stockNames:1 }}
    )
    console.log("foundStock: " + foundStock)

    //does not result in specific array index -----TO DO-----
    var index
    if (foundStock !== null) {
      const stockArr = foundStock.toArray()
      console.log("stockArr: " + stockArr)
      index = stockArr.indexOf(stockName)
    }

    if (foundStock === null && changeAmount <= 0) { //error if subtracting from nonexistent stock
      res.status(404).json({ error:true, message: 'Stock Not Found'})

    } else if (foundStock === null && changeAmount > 0) { //add to db if adding to stock not in array

      const newStock = db.collection('Investors').updateOne({username}, {$push:{stockNames : stockName}})
      const newCount = db.collection('Investors').updateOne({username}, {$push: {stockCounts : changeAmount}})
      
      if(newStock.modifiedCount === null || newCount.modifiedCount === null) {
        res.status(404).json({error:true, message: 'Stock Could Not Be Added'})

      } else {
        const updateString = 'Purchased ' + changeAmount + ' shares of ' + stockName
        const histUpdate = db.collection('Investors').updateOne({username}, {$push:{stockHistory : updateString}})
        if (histUpdate.modifiedCount === null) {
          res.status(404).json({error:true, message: 'History Could Not Be Updated'})
        }

        res.json({error: false, message: 'Stock Successfully Added'})
      }
    
    } else {
      //check final stock amount
      //does not result in integer -----TO DO-----
      const preStockAmount = await db.collection('Investor').findOne(
        { username },
        {projection: { _id:0, num: { $arrayElemAt: ['stockCounts', index] } } }
        )

      if (preStockAmount - changeAmount < 0) { //error if negative
        res.status(400).json({ error: true, message: 'Not Enough Stocks To Sell'})

      } else if (preStockAmount - changeAmount == 0) { //delete stock if 0
        const nameDelete = await db.collection('Investors').updateOne({ username }, {$pull: {stockNames:stockName}})
        const countDelete = await db.collection('Investors').updateOne(
          { username }, 
          {$pull: {stockCounts:changeAmount}}
        )
        
        if(nameDelete.modifiedCount === null || countDelete.modifiedCount === null) {
          res.status(404).json({error:true, message: 'Stock Could Not Be Removed'})

        } else {
          const updateString = 'Sold ' + changeAmount + ' shares of ' + stockName
          const histUpdate = db.collection('Investors').updateOne({username}, {$push:{stockHistory : updateString}})
          if (histUpdate.modifiedCount === null) {
            res.status(404).json({error:true, message: 'History Could Not Be Updated'})
          }

          res.json({error: false, message: 'Stock Successfully Removed'})
        }

      } else { //change amount if positive
        const stockChange = await db.collection('Investors').updateOne(
          { username }, 
          {$inc: {[`stockCounts.${index}`] : changeAmount}}
        )
        
        if (stockChange.modifiedCount === null) {
          res.status(404).json({error:true, message:'Stock Could Not Be Updated'})
        } else {
          const updateString = 'Purchased ' + changeAmount + ' shares of ' + stockName
          const histUpdate = db.collection('Investors').updateOne({username}, {$push:{stockHistory : updateString}})
          if (histUpdate.modifiedCount === null) {
            res.status(404).json({error:true, message: 'History Could Not Be Updated'})
          }
          
          res.json({error: false, message: 'Stock Successfully Updated'})
        }
      }
    }
  }, 'MonkeyBusinessWebApp')
}
