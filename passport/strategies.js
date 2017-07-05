const db = require('../models/queries.js')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy



passport.serializeUser(
  (users, done) => {
    done(null, users.id)
  }
)

passport.deserializeUser(
  (id, done) => {
    db.getUserByID(id).then(
      user => done(null, user)
    )
  }
)

passport.use(new LocalStrategy(
  (username, password, done) => {
    db.getAllUsers('users')
    .then(users => {
      const auth = users.find( 
        user =>
        user.username === username && user.password ===  password   
      )
      if (!auth) {
        done(null, false)
      } else {
        session = auth
        done(null, auth)
      }
    })
  }
))

module.exports = passport