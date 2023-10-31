import bcryptjs from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()


export async function comparePasswords (password, hash) {
  const result = await bcryptjs.compare(password, hash)
  return result
}
export async function genAccessToken (username) {
  const accessToken = await jwt.sign({ username }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '30s' })
  return { accessToken }
}
export async function genRefreshToken (username) {
  const refreshToken = await jwt.sign({ username }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '1d' })
  return { refreshToken }
}
