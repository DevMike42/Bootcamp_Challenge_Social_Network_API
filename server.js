const express = require('express')
const dotenv = require('dotenv')
const colors = require('colors')
const connectDB = require('./config/db')
const routes = require('./routes')

const PORT = process.env.PORT || 3001
const app = express()

dotenv.config()

connectDB()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(routes)

app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.cyan.bold)
})