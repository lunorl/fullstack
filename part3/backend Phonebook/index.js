var morgan = require('morgan')
const express = require('express')
const app = express()
const cors = require('cors')
const Person = require('./models/book')
app.use(express.static('build'))
app.use(cors())
morgan('tiny')

let persons = [
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.use(express.json())

app.get('/api/persons', (request, response) => {
    Person.find({}).then(people => {
        response.json(people)
    })
})
app.get('/api/persons/:id', (request, response) => {
    Person.findById(request.params.id).then(person =>
        response.json(person)
    )
    const id = request.params.id
    const person = persons.filter(book => book.id === id)
    if (person.length === 0) {
        response.status(404).end()
    } else {
        response.json(person)
    }
})
app.get('/info', (request, response) => {
    response.send(`<div>Phonebook has input for ${persons.length} people <br /> ${Date()}</div>`)
}) 
app.post('/api/persons', (request, response) => {   
    const id = Math.floor(Math.random()*100)
    const person = request.body
    const final = {...person, "id": `${id}`}
    const names = persons.map(person => person.name)
    if (!final.name || !final.number) {
        return response.status(400).json({
            error: 'a part of the body is missing'
        })
    } else if (names.includes(final.name)) {
        return response.status(400).json({
            error: 'name must be unique'
        })
    }
    persons = persons.concat(final)
    response.json(final)
})
app.delete('/api/persons/:id', (request, response) => {
    const id = request.params.id
    persons = persons.filter(person => person.id !== id)

    response.status(204).end()
})
const PORT = process.env.PORT || 3001
app.listen(PORT, '0.0.0.0',  () => {
    console.log(`Server running on port ${PORT}`)
})