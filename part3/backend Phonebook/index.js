var morgan = require('morgan')
const express = require('express')
const app = express()
const cors = require('cors')
const Person = require('./models/book')
app.use(express.static('build'))
app.use(cors())
morgan('tiny')
app.use(express.json())
const errorHandler = (error, request, response, next) => {
    console.error(error.message)
  
    if (error.name === 'CastError') {
      return response.status(400).send({ error: 'malformatted id' })
    } 
  
    next(error)
  }
  
  // this has to be the last loaded middleware, also all the routes should be registered before this!
  app.use(errorHandler)
app.get('/api/persons', (request, response) => {
    Person.find({}).then(people => {
        response.json(people)
    })
})
app.get('/api/persons/:id', (request, response, next) => {
    Person.findById(request.params.id).then(person =>
        response.json(person)
    ).catch(error => next(error))
})
app.get('/info', (request, response) => {
    Person.countDocuments().then(count =>
        response.send(`<div>Phonebook has input for ${count} people <br /> ${Date()}</div>`)
    )
})
app.put('/api/persons/:id', (request, response) => {
    body = request.body 
    const person = {
        name: body.content,
        number: body.number,
      }
    Person.findByIdAndUpdate(request.params.id, person, {new: true}).then(person =>
        response.json(person)
    )
}) 
app.post('/api/persons', (request, response) => {   
    const body = request.body
    if (body.name === undefined || body.number === undefined) {
        return response.status(400).json({ error: 'content missing' })
    } else {
        const person = new Person({
            name: body.name,
            number: body.number,

        })
        person.save().then(person => {
            response.json(person)
        })

        }
    }
)
app.delete('/api/persons/:id', (request, response, next) => {
    Person.findByIdAndDelete(request.params.id).then(person =>
        response.status(204).end()
    ).catch(error => next(error))
})
const PORT = process.env.PORT || 3001
app.listen(PORT, '0.0.0.0',  () => {
    console.log(`Server running on port ${PORT}`)
})