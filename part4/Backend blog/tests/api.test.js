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
    .send(helper.newPost)
    const blogs = await helper.currentBlogs()
    assert.strictEqual(blogs.length, helper.initialBlogs.length+1)
})
test('likes defaults to zero', async () => {
    const newPost = {        
        title: 'greatblog',
        author: 'random guy',
        url: 'http://erwetq.com'
    }
    const response = await api
        .post('/api/blogs')
        .send(newPost)
    const blogs = await helper.currentBlogs()
    assert.strictEqual(blogs.map(blog => blog.likes)[blogs.length-1], 0)
})
test('default thing', async () => {
    const newPost = {        
        author: 'random guy',
        url: 'http://erwetq.com'
    }
    const newePost = {        
        title: 'hello',
        url: 'http://erwetq.com'
    }
    await api
        .post('/api/blogs')
        .send(newPost)
        .expect(400)
    await api
        .post('/api/blogs')
        .send(newePost)
        .expect(400)
})
test('removing reduces the number', async () => {
    const stuff = await helper.currentBlogs()
    const id = stuff[0].id
    console.log(id)
    const length = stuff.length 
    await api.
    delete(`/api/blogs/${id}`)
    .expect(204)
    const next = await helper.currentBlogs()
    assert.strictEqual(length-1, next.length)
})
test('removing doesnt work with fake id', async () => {
    await api.
    delete(`/api/blogs/qwe12313we`)
    .expect(400)
})
test('updating likes works', async () => {
    const start = await helper.currentBlogs()
    const id = start[0].id
    await api.
    put(`/api/blogs/${id}`).
    send({ likes: 23}).
    expect(200)
    const now = await helper.currentBlogs()
    assert.equal(now[0].likes, 23)
})
test('updating invalid fails', async () => {
    const start = await helper.currentBlogs()
    await api.
    put(`/api/blogs/sad441342135s`)
    .expect(400)

})
after(async () => {
    await mongoose.connection.close()
  })
