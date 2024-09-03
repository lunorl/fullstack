const express = require('express')
const app = require('./app')
const cors = require('cors')
const config = require('./utils/config')
const logger = require('./utils/logger')
const Note = require('./models/note')
require('dotenv').config()
// DO NOT SAVE YOUR PASSWORD TO GITHUB!!
console.log('hi')
app.use(express.static('dist'))
app.use(cors())
app.use(express.json())
const PORT = process.env.PORT || 3001
app.listen(PORT, '0.0.0.0', () => {
  logger.info(`Server running on port ${PORT}`)
})