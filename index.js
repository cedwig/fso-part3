const express = require('express')
const app = express()

app.use(express.json())

let persons = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get('/api/persons', (request, response) => {
    response.json(persons)
})

app.get('/info', (request, response) => {
    const dateAndTime = new Date()
    response.send(`<p>Phonebook Has info for ${persons.length} people</p>
                   <p>${dateAndTime}</p>`)
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id)
    
    if (person) {
        response.json(person)
    } else {
        response.status(404).end()
    }
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)
  
    response.status(204).end()
})

const findPerson = (personToCheck) => {
    return persons.find(person => person.name === personToCheck)
}

app.post('/api/persons', (request, response) => {
    const body = request.body
    const randomId = Math.floor(Math.random() * 1337)

    if(findPerson(body.name)) {
        return response.status(400).json({
            error: `${body.name} is already in the phonebook, names must be unique`
        })
    }
  
    if (!body.name || !body.number) {
        return response.status(400).json({ 
            error: 'A new entry must have a name and a number' 
        })
    }
  
    const person = {
      name: body.name,
      number: body.number,
      id: randomId,
    }
  
    persons = persons.concat(person)
  
    response.json(person)
})

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})