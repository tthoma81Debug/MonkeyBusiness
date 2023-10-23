import bcryptjs from 'bcrypt'
import jwt from 'jsonwebtoken'

export function isAuthenticated (req, res, next) { // Check if user is authenticated ------------------TO DO --------------------
  if (req.session.user) next()
  else next('route')
}
export function isAdmin (req, res, next) { // Check if user is admin ------------------TO DO --------------------
  if (req.session.user === 'admin') next()
  else next('route')
}
