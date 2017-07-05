const express = require('express')
const bodyParser = require('body-parser')
const db = require('./models/queries.js')
const passport = require('./passport/strategies.js')
const app = express()

require('ejs')
app.set('view engine', 'ejs')
app.use(express.static(__dirname + '/public'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(passport.initialize())


var session = null

app.get('/', (req, res, next) => {
  res.render('index', {session})
})

app.post('/', (req, res, next) => {
  const {username, password} = req.body
  db.getAllUsers('users')
    .then(users => {
      let auth = users.find( user => {
        return user.username === username && user.password ===  password   
      })
      session = auth
    })
  res.redirect('/')
})

app.get('/logout', (req, res, next) => {
  session = null
  res.redirect('/')
})

app.listen(3000, () => console.log('listening on port 3000'))