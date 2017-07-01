const express = require('express')
const bodyParser = require('body-parser')
const db = require('./models/queries.js')
const app = express()

require('ejs')
app.set('view engine', 'ejs')
app.use(express.static(__dirname + '/public'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))


var session = null

app.get('/', (req, res, next) => {
  res.render('index')
})

app.post('/', (req, res, next) => {
  res.redirect('/auth')
})

app.get('/auth', (req, res, next) => {
  
  session 
  ? res.send("Sucess") 
  : res.send("Failed")

})

app.listen(3000, () => console.log('listening on port 3000'))