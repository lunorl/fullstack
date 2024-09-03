const User = require('../models/users')
const bcrypt = require('bcryptjs')
const usersRouter = require('express').Router()
usersRouter.post('/', async (request, response) => {
    const { password, name, username} = request.body
    if ((!password) || (!username) || password.length < 3 || username.length < 3) {
        return response.status(400).json({ error: 'problem with password or username'})
    }
    console.log('Request body:', request.body)
    const passwordHash = await bcrypt.hash(password, 10)
    const guy = new User({ username, name, passwordHash })
    
    const saveUser = await guy.save()

    response.status(201).json(saveUser)
})
usersRouter.get('/', async (request, response) => {
    const stuff = await User.find({}).populate('blog', { url: 1, title: 1, author: 1, id: 1 })

    response.json(stuff)
})
module.exports = usersRouter