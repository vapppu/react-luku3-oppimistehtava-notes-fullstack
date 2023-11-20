require('dotenv').config()

const express = require('express')

const app = express()

app.use(express.static('dist'))

const cors = require('cors')
app.use(cors())

app.use(express.json())

const Note = require('./models/note')


app.get('/', (req, res) => {
  res.send('<h1>Hello World!</h1>')
})

app.get('/api/notes', (req, res) => {
  Note.find({}).then(notes => {
    res.json(notes)
  })
})

const generateId = () => {
  const maxId = notes.length > 0
    ? Math.max(...notes.map(n => n.id))
    : 0
  return maxId + 1
}

app.post('/api/notes', (request, response) => {
  const body = request.body

  if (body.content === undefined) {
    return response.status(400).json({error: 'content missing'})
  }

  const note = new Note({
    content: body.content,
    important: body.important || false,
  })

  note.save()
    .then(savedNote => {
      response.json(savedNote)
    })

})

app.get('/api/notes/:id', (request, response) => {
  Note.findById(request.params.id).then(note => {
    response.json(note)
  })
})

app.delete('/api/notes/:id', (request, response) => {
  const id = Number(request.params.id)
  notes = notes.filter(note => note.id !== id)
  return response.status(400).json({ 
    error: 'note not found' 
  })})

app.put('/api/notes/:id', (request, response) => {
  const id = Number(request.params.id)
  if (!notes.find(note => note.id === id))
  {
    response.status(404).end()
  }
  const newNote = request.body
  notes = notes.map(note => note.id === id ? newNote : note)
  response.json(newNote)
})

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})