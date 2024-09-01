const express = require('express')
const appRouter = express.Router()
const Blog = require('../models/blog');
const { randomInt } = require('crypto');

appRouter.get('/', async (request, response) => {
  console.log('m')
  const variable = await Blog.find({})
  console.log('s', variable)
  response.json(variable)
})

appRouter.post('/', async (request, response) => {
  const blog = new Blog(request.body)
  blog.id = randomInt(248)*randomInt(248)
  await blog.save()
  response.status(201).json(result)
  blog.save()
});

module.exports = appRouter;
