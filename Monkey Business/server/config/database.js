import mongoose from 'mongoose'
import Dotenv from 'dotenv'
Dotenv.config()
const DB_USER = process.env.DB_USER ?? 'unknown'
const DB_PASS = process.env.DB_PASS ?? 'unknown'
// const apiKey = 'b4j3Sx7dSOst3JMj4P5tddrvKgFbwunvsnsi039rxf3PllmCSwYA129X9GWO1lqt'
const url = `mongodb+srv://${DB_USER}:${DB_PASS}@monkeybusinesscluster.bkutl1e.mongodb.net/`

const connection = mongoose.createConnection(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
})

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  hash: {
    type: String,
    required: true
  },
  salt: {
    type: String,
    required: true
  }
})

export const User = connection.model('User', UserSchema)

mongoose.connection
  .on("open", () => console.log("The goose is open"))
  .on("close", () => console.log("The goose is closed"))
  .on("error", (error) => {
    console.log(error);
    process.exit();
  })

export default mongoose.connection
