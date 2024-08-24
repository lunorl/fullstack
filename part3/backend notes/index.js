const express = require('express')
const app = express()
const cors = require('cors')
const Note = require('./models/note')
require('dotenv').config()
// DO NOT SAVE YOUR PASSWORD TO GITHUB!!
console.log('hi')
app.use(express.static('dist'))
app.use(cors())
app.use(express.json())
const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  }  else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message})
  }

  next(error)
}

// this has to be the last loaded middleware, also all the routes should be registered before this!
app.use(errorHandler)
app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})

app.post('/api/notes', (request, response, next) => {
  const body = request.body
  const note = new Note({
    content: body.content,
    important: body.imortant || false
  })

  note.save().then(savedNote => {
    response.json(savedNote)
  })
    .catch(error => next(error))
})
app.get('/api/notes/:id', (request, response, next) => {
  Note.findById(request.params.id).then(note => {
    if (note) {
      response.json(note)
    } else {
      response.status(404).end()
    }
  })
    .catch(error => next(error))
})

app.get('/api/notes', (request, response) => {
  Note.find({}).then(notes => {
    response.json(notes)
    console.log(notes)

  })
})
app.put('/api/notes/:id', (request, response, next) => {
  const { content, important } = request.body



  Note.findByIdAndUpdate(
    request.params.id,
    { content, important },
    { new: true, runValidators: true, context: 'query' })
    .then(updatedNote => {
      response.json(updatedNote)
    })
    .catch(error => next(error))
})
app.delete('/api/notes/:id', (request, response, next) => {
  Note.findByIdAndDelete(request.params.id).
    then(() => {
      response.status(204).end()
    })
    .catch(error => next(error))
})
const PORT = process.env.PORT || 3001
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`)
})