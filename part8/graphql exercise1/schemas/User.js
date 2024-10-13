const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    username: {
        required: true,
        type: String
    },
    favoriteGenre: {
        required: true,
        type: String
    }
})

module.exports = mongoose.model('User', schema)