const mongoose = require('mongoose')

const Users = new mongoose.Schema({
    username: String,
    name: String,
    passwordHash: String,
    blogs: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Blog'
    }]
})

Users.set('toJSON', { 
    transform: (document, returnedObject) => {
    returnedObject.id = document._id
    delete returnedObject._id
    delete returnedObject.__v

    delete returnedObject.passwordHash
}
})
const User = mongoose.model('User', Users)

module.exports = User

