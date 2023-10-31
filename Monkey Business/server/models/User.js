import mongoose from 'mongoose'

const UserScema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    min: 3,
    max: 25
  },
  email: {
    type: String,
    required: true,
    min: 3,
    max: 25
  },
  password: {
    type: String,
    required: true,
    min: 8,
    max: 25
  },
  date: {
    type: Date,
    default: Date.now
  }
})

const User = mongoose.model('User', UserScema)

export default User
