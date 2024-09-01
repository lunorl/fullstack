const { test, after, beforeEach } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')

beforeEach(async () => {
    await Blog.deleteMany({})
    
    const blogObjects = helper.initialBlogs
    .map(blog => new Blog(blog))
    const promiseArray = blogObjects.map(blog => blog.save())
    await Promise.all(promiseArray)

})

test('GET request', async () => {
    const thing = await api.get('/api/blogs')
    .expect(200)
    assert.equal(thing.body.length, helper.initialBlogs.length)
})
test('has id', async () => {
    const stuff = await api.get('/api/blogs').expect(200)
    const ids = await stuff.body.map(blog => blog.id)
    assert.equal(ids.length, helper.initialBlogs.length)
})
test('post creates a new', async () => {
    await api.post('/api/blogs')
    .send(new Blog(helper.newPost))
    const blogs = await helper.currentBlogs()
    assert.strictEqual(blogs.length, helper.initialBlogs.length+1)
})
test('likes defaults to zero', async () => {
    await api.post('/api/blogs')
    .send(new Blog(helper.newPost))
    const blogs = await helper.currentBlogs()
    assert.strictEqual(blogs[blogs.length-1].likes, 0)
})
after(async () => {
    await mongoose.connection.close()
  })
