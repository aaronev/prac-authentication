const express = require('express')
const bodyParser = require('body-parser')
const db = require('./models/queries.js')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const app = express()

require('ejs')
app.set('view engine', 'ejs')
app.use(express.static(__dirname + '/public'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(passport.initialize())

var session = null

passport.serializeUser((user, done) => {
  done(null, user.id)
})

passport.deserializeUser((id, done) => {
  db.getUserByID(id).then(user => done(null, user))
})

passport.use(new LocalStrategy((username, password, done) => {
  db.getAllUsers()
    .then(users => {
      const foundUser = users.find(user => user.username === username)
      if (!foundUser) {
        return done(null, false)
      }
      if (foundUser.password === password) {
        session = foundUser
        return done(null, foundUser)
      } else {
        return done(null, false)
      }
    })
}))

app.get('/', (req, res, next) => {
  res.render('index', {session})
})

app.get('/login', (req, res, next) => {
  res.render('login')
})

app.post('/login', passport.authenticate('local', {
  successRedirect: '/', 
  failureRedirect: '/login'
}))

app.get('/logout', (req, res, next) => {
  session = null
  res.redirect('/')
})

app.listen(3002, () => console.log('listening on port 3002'))

































