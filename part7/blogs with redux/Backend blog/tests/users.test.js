const supertest = require('supertest')
const { test, after, beforeEach } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const app = require('../app')
const api = supertest(app)
const helper = require('./test_helper')
const User = require('../models/users')

beforeEach(async () => {
    User.deleteMany({})

    const stuff = helper.initialUsers.map(user => User(user))
    const promises = stuff.map(thing => thing.save())
    await Promise.all(promises)
})
test('is it possible to enter a user with no username', async () => {
    const old = helper.currentUsers.length
    const invalidUser = User({
        name: "john",
        password: "el"
    })
    await api.post('/api/users').send(invalidUser).expect(400)

    assert.equal(helper.currentUsers.length, old)
    console.log('hi')
})
test('is it possible to enter a user when too short', async () => {
    const old = helper.currentUsers.length
    const invalidUser = User({
        username: "l",
        name: "john",
        password: "el"
    })
    await api.post('/api/users').send(invalidUser).expect(400)

    assert.equal(helper.currentUsers.length, old)
    console.log('hi')
})
after(async () => {
    await mongoose.connection.close()
  })