const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')
usersRouter.get('/', async (request, response) => {
  console.log('hit')
  const users = await User.find({}).populate('notes', { content: 1, important: 1 })
  response.json(users)
})
usersRouter.post('/', async (request, response) => {
  const { password, name, username } = request.body

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new User({
    username,
    name,
    passwordHash
  })

  const savedUser = await user.save()

  response.status(201).json(savedUser)
})

module.exports = usersRouter