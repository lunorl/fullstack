const express = require('express')
const appRouter = express.Router()
const Blog = require('../models/blog')

appRouter.get('/', (request, response) => {
  Blog.find({})
    .then(blogs => {
      response.json(blogs)
    })
    .catch(error => {
      response.status(500).json({ error: 'Internal server error' })
    });
});

// Route to add a new blog
appRouter.post('/', (request, response) => {
  const blog = new Blog(request.body)

  blog.save()
    .then(result => {
      response.status(201).json(result)
    })
    .catch(error => {
      response.status(400).json({ error: 'Bad request' })
    });
});

module.exports = appRouter;
