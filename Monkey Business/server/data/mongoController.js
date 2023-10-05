
import { MongoClient, ServerApiVersion } from 'mongodb'
import Dotenv from 'dotenv'

Dotenv.config()
const DB_USER = process.env.DB_USER ?? 'unknown'
const DB_PASS = process.env.DB_PASS ?? 'unknown'
// const apiKey = 'b4j3Sx7dSOst3JMj4P5tddrvKgFbwunvsnsi039rxf3PllmCSwYA129X9GWO1lqt'
const url = `mongodb+srv://${DB_USER}:${DB_PASS}@monkeybusinesscluster.bkutl1e.mongodb.net/`

const Mongo = new MongoClient(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi:
  {
    version: ServerApiVersion.v1,
    strict: true
  }
})
export default function queryMongoDatabase (queryCallback, databaseName) {
  queryCallback(Mongo.db(databaseName))
    .catch(err => {
      console.error('Failed to query database')
      console.error(err)
    })
}
//------------------MongoDB Atlas Connection Test --------------------

// async function run() {
//   try {
//     const database = Mongo.db("MonkeyBusinessWebApp");
//     const movies = database.collection("Users");
//     const query = { username: "test" };
//     const options = {
//       sort: { username: 1 },
//       projection: { _id: 0, username: 1, password: 1 }
//     };
//     const cursor = movies.find(query, options);
//     if ((await movies.countDocuments(query)) === 0) {
//       console.log("No documents found!");
//     }
//     for await (const doc of cursor) {
//       console.dir(doc);
//     }
//   } finally {
//     console.log("Closing connection");
//   }
// }
// run().catch(console.dir);
