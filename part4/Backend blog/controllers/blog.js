const express = require('express')
const appRouter = express.Router()
const Blog = require('../models/blog');
const User = require('../models/users')
const { randomInt } = require('crypto');
const jwt = require('jsonwebtoken')
const middleware = require('../utils/middleware')
appRouter.get('/', async (request, response) => {
  const variable = await Blog.find({}).populate('user', {username: 1, name: 1, id: 1})
  response.json(variable)
})
appRouter.post('/', async (request, response) => {
  const decodedPassword = jwt.verify(middleware.getTokenFrom(request), process.env.SECRET)
  if (! decodedPassword.id) {
    return response.status(401).json({ error: 'invalid username or password'})
  }
  const user = User.findById(decodedPassword.id)
  const blog = new Blog({
    url: request.body.url,
    title: request.body.url,
    author: request.body.author,
    user: user,
    likes: request.body.likes,
  })
  const result = await blog.save()
  user.blogs = user.blogs.concat(blog)
  await user.save()
  response.status(201).json(result)
});
appRouter.put('/:id', async (request, response) => {
  const blog = {
    title: request.body.title,
    author: request.body.author,
    url: request.body.url,
    likes: request.body.likes || 0
  }
  const m = await Blog.findByIdAndUpdate(request.params.id, blog)
  response.json(m)
})
appRouter.delete(`/:id`, async (request, response) => {
  await Blog.findByIdAndDelete(request.params.id)
  response.status(204).end()
})

module.exports = appRouter;
