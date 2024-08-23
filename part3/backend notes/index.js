const express = require('express')
const app = express()
const cors = require('cors')
const Note = require('./models/note')
require('dotenv').config();
const mongoose = require('mongoose')

// DO NOT SAVE YOUR PASSWORD TO GITHUB!!
console.log('hi');
app.use(express.static('dist'))
app.use(cors())
app.use(express.json())
let notes = [  {    id: "1",    content: "HTML is easy",    important: true  },  {    id: "2",    content: "Browser can execute only JavaScript",    important: false  },  {    id: "3",    content: "GET and POST are the most important methods of HTTP protocol",    important: true  }]
app.get('/', (request, response) => {
    response.send('<h1>Hello World!</h1>')
  })
const generateId = () => {
    const maxId = notes.length > 0
      ? Math.max(...notes.map(n => Number(n.id)))
      : 0
    return String(maxId + 1)
  }
  
  app.post('/api/notes', (request, response) => {
    const body = request.body
  
    if (body.content === undefined) {
      return response.status(400).json({ error: 'content missing' })
    }
    const note = new Note({
      content: body.content,
      important: body.imortant || false
    })
  
    note.save().then(savedNote => {
      response.json(savedNote)
    })
  })  
  app.get('/api/notes/:id', (request, response) => {
    Note.findById(request.params.id).then(note => {
      response.json(note)
    })
  })
  
  app.get('/api/notes', (request, response) => {
    Note.find({}).then(notes => {
      response.json(notes)
      console.log(notes)
      
    })
  })
  app.delete('/api/notes/:id', (request, response) => {
    const id = request.params.id
    notes = notes.filter(note => note.id !== id)
  
    response.status(204).end()
  })
  
  const PORT = process.env.PORT || 3001
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`)
  })