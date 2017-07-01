
const pgp = require('pg-promise')()
const dbName = 'auth-prac'
const connectionString = process.env.DATABASE_URL || `postgres://localhost:5432/${dbName}`
const db = pgp(connectionString)

const getAllUsers = table => db.any(`SELECT * FROM ${table};`)

module.exports = getAllUsers