const express = require('express')
const app = express()
const cors = require('cors')
const appRouter = require('./controllers/blog')
const mongoose = require('mongoose')
const middleware = require('./utils/middleware')
require('dotenv')
require('dotenv').config()
mongoose.set('strictQuery', false)
const mongoUrl = process.env.MONGODB_URI
mongoose.connect(mongoUrl)

app.use(cors())
app.use(express.json())
app.use(middleware.requestLogger)
app.use('/api/blogs', appRouter)

module.exports = app