import bcryptjs from 'bcrypt'
import jwt from 'jsonwebtoken'

export function isAuthenticated (req, res, next) { // Check if user is authenticated ------------------TO DO --------------------
  if (req.isAuthenticated()) next()
  else {
    req.session.error = 'Please login to access this page' // 2 ways to display an error message on the client after redirect
    req.flash('error', 'Please login to access this page')
    res.redirect('/login')
  }
}
export function isAdmin (req, res, next) { // Check if user is admin ------------------TO DO --------------------
  if (req.session.user === 'admin') next()
  else next('route')
}
