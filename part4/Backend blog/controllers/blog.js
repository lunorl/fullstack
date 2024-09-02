const express = require('express')
const appRouter = express.Router()
const Blog = require('../models/blog');
const { randomInt } = require('crypto');

appRouter.get('/', async (request, response) => {
  const variable = await Blog.find({})
  response.json(variable)
})

appRouter.post('/', async (request, response) => {
  const blog = new Blog(request.body)
  await blog.save()
  response.status(201).json(result)
  blog.save()
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
