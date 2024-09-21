const bcrypt = require('bcrypt')
const router = require('express').Router()
const User = require('../models/user')

router.post('/', async (request, response) => {
  const { username, name, password } = request.body
  if (!password || password.length < 3) {
    return response.status(400).json({ error: 'password missing or too short' })
  }


  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new User({
    username,
    name,
    passwordHash,
  })

  const savedUser = await user.save()

  response.status(201).json(savedUser)
})

router.get('/', async (request, response) => {
  const users = await User.find({}).populate('blogs', { url: 1, title: 1, author: 1 })
  response.json(users)
})
router.put('/:id', async (request, response) => {
  const body = request.body

  const blog = {
    user: body.user,
    username: body.username,
    token: body.token,
    blogs: body.blogs
  }

  const updatedUser = await User.findByIdAndUpdate(request.params.id, blog)
  response.json(updatedUser)
})
module.exports = router