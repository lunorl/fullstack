const mongoose = require('mongoose')
require('dotenv')
mongoose.set(StrictQuery, false)

mongoose.connect(process.env.MONGODB_URI).then(result => {    console.log('connected to MongoDB')  })  .catch(error => {    console.log('error connecting to MongoDB:', error.message)  })

const personSchema = {
    name: String,
    number: String,
}

personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
  })

module.exports = mongoose.model('person', personSchema)