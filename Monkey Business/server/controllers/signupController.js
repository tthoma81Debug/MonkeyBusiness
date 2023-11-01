import bcryptjs from 'bcrypt'
import jwt from 'jsonwebtoken'

export async function hashPassword (password) {
  const saltRounds = 10
  const salt = await bcryptjs.genSalt(saltRounds)
  const hash = await bcryptjs.hash(password, salt)
  return hash
}

