import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

export const verifyJWT = (req, res, next) => {
  const token = req.headers['x-access-token']
  if (!token) {
    return res.status(401).json({ auth: false, message: 'No token provided.' })
  }
  const decoded = token.split(' ')[1]
  jwt.verify(decoded, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ auth: false, message: 'Failed to authenticate token.' })
    }
    // if everything good, save to request for use in other routes
    req.user = decoded.username
    next()
  })
}
