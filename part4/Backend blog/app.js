const express = require('express')
require('express-async-errors')
const app = express()
const cors = require('cors')
const appRouter = require('./controllers/blog')
const usersRouter = require('./controllers/users')
const mongoose = require('mongoose')
const middleware = require('./utils/middleware')
require('dotenv').config()
mongoose.set('strictQuery', false)
const mongoUrl = process.env.MONGODB_URI
mongoose.connect(mongoUrl)

app.use(cors())
app.use(express.json())
app.use(middleware.requestLogger)
app.use('/api/blogs', appRouter)
app.use('/api/users', usersRouter)
app.use(middleware.errorHandler)
app.use(middleware.unknownEndpoint)

module.exports = app