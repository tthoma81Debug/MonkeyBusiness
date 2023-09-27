
import Mongo from 'mongodb'
import Dotenv from 'dotenv'

Dotenv.config()
const DB_USER = process.env.DB_USER ?? 'unknown'
const DB_PASS = process.env.DB_PASS ?? 'unknown'
// const apiKey = 'b4j3Sx7dSOst3JMj4P5tddrvKgFbwunvsnsi039rxf3PllmCSwYA129X9GWO1lqt'
const url = `mongodb+srv://${DB_USER}:${DB_PASS}@monkeybusinesscluster.bkutl1e.mongodb.net/`

const client = new Mongo.MongoClient(url, {
  useNewUrlParser: true, useUnifiedTopology: true, serverApi: Mongo.ServerApiVersion.v1
})

export default function queryMongoDatabase (queryCallback, databaseName) {
  queryCallback(client.db(databaseName))
    .catch(err => {
      console.error('Failed to query database')
      console.error(err)
    })
}
