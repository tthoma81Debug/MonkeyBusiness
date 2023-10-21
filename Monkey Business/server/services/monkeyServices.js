import queryMongoDatabase from '../data/mongoController.js'

export async function getMonkeyInvestments (req, res) {
  const username = req.session.username
  queryMongoDatabase(async db => {
    const data = await db.collection('Monkey').find({ username }, { projection: { _id: 0, username: 0 } })
    if ((await db.collection('Monkey').countDocuments({ username })) < 1) {
      res.status(404).json({ error: true, message: 'No Monkey Investment Found' })
    }
    const monkeyArray = []
    for await (const doc of data) {
      monkeyArray.push(doc)
    }
    res.json(monkeyArray)
  }, 'MonkeyBusinessWebApp')
}

export async function getMonkeyStocks (req, res) {
  const username = req.session.username
  queryMongoDatabase(async db => {
    const data = await db.collection('Monkey').find({ username }, { projection: { _id: 0 } })
    if ((await db.collection('Monkey').countDocuments({ username })) < 1) {
      res.status(404).json({ error: true, message: 'No Monkey Investment Found' })
    }
    for await (const doc of data) {
      const monkeyStocks = (doc.stocks)
      res.json(monkeyStocks)
    }
  }, 'MonkeyBusinessWebApp')
}

export async function getMonkeyHistory (req, res) {
  const username = req.session.username
  queryMongoDatabase(async db => {
    const data = await db.collection('Monkey').find({ username }, { projection: { _id: 0 } })
    if ((await db.collection('Monkey').countDocuments({ username })) < 1) {
      res.status(404).json({ error: true, message: 'No Monkey Investment Found' })
    }
    for await (const doc of data) {
      const monkeyHistory = (doc.history)
      res.json(monkeyHistory)
    }
  }, 'MonkeyBusinessWebApp')
}

export async function updateMonkey (req, res) {
  const monkey = req.body

  queryMongoDatabase(async db => {
    const data = await db.collection('Monkey').findOne({ username: monkey.username, name: monkey.name }, { projection: { _id: 1, username: 0, name: 0, stocks: 0, history: 0, amount: 0 } })
    if (data < 1) {
      // create new monkey
      const newMonkey = {
        username: monkey.username,
        name: monkey.name,
        stocks: monkey.stocks,
        history: monkey.history,
        amount: monkey.amount
      }
      const insert = await db.collection('Monkey').insertOne(newMonkey)
      if (insert.insertedCount !== 1) {
        res.status(500).json({ error: true, message: 'Error inserting data' })
      }
    } else {
      // update monkey
      const update = await db.collection('Monkey').updateOne({ username: monkey.username, name: monkey.name }, { $set: { stocks: monkey.stocks, history: monkey.history } })
      if (update.modifiedCount !== 1) {
        res.status(500).json({ error: true, message: 'Error updating data' })
      }
    }
    res.json({ error: false, message: 'Success' })
  }, 'MonkeyBusinessWebApp')
}
