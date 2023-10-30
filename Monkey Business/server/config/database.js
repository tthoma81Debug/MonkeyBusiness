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

const User = connection.model('User', UserSchema)

module.exports = connection
