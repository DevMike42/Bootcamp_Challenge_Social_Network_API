const express = require('express')
const dotenv = require('dotenv')
const colors = require('colors')

dotenv.config()


const PORT = process.env.PORT || 3001
const app = express()


app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.cyan.bold)
})