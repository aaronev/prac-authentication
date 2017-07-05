const pgp = require('pg-promise')()
const dbName = 'auth_prac'
const connectionString = process.env.DATABASE_URL || `postgres://localhost:5432/${dbName}`
const db = pgp(connectionString)

const getAllUsers = table => db.any(`SELECT * FROM ${table};`)

const getUserByID = id => db.any('SELECT * FROM users WHERE id = $1;', id)

module.exports = {
  getAllUsers,
  getUserByID
}