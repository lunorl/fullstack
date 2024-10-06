const router = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

router.post('/', async (request, response) => {
    console.log('mnm')
    await Blog.deleteMany({})
    await User.deleteMany({})
    console.log('done')
    response.json(200).end()
})

module.exports = router