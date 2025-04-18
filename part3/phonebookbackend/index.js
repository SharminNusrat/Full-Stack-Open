const express = require('express')
const app = express()
const morgan = require('morgan')

let persons = [
    {
        id: "1",
        name: "Arto Hellas",
        number: "040-123456"
    },
    {
        id: "2",
        name: "Ada Lovelace",
        number: "39-44-5323523"
    },
    {
        id: "3",
        name: "Dan Abramov",
        number: "12-43-234345"
    },
    {
        id: "4",
        name: "Mary Poppendieck",
        number: "39-23-6423122"
    }
]

morgan.token('data', (request, response) => {
    if(request.method === 'POST') {
        return JSON.stringify(request.body)
    } 
    else return ''
})

app.use(express.static('dist'))
app.use(express.json())
app.use(morgan((tokens, req, res) => {
    const data = tokens.data(req, res)
    return [
        tokens.method(req, res),
        tokens.url(req, res),
        tokens.status(req, res),
        tokens.res(req, res, 'content-length'),
        '-',
        tokens['response-time'](req, res), 'ms',
        data? ` ${data}` : ''
    ].join(' ')
}))

app.get('/', (request, response) => {
    response.send('<h1>Hello World!</h1>')
})

app.get('/info', (request, response) => {
    const time = new Date()
    response.send(
        `<p>Phonebook has info for ${persons.length} people</p>
        <p>${time}</p>`
    )
})

app.get('/api/persons', (request, response) => {
    response.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
    const id = request.params.id
    const person = persons.find(p => p.id === id)
    console.log(person)

    if(person) {
        response.json(person)
    }
    else {
        response.status(404).end()
    }
})

const generateId = () => {
    return (Math.floor(Math.random() * 10000000) + 1).toString()
}

app.post('/api/persons', (request, response) => {
    const body = request.body
    
    if(!body.name || !body.number) {
        return response.status(400).json({
            error: 'name or number missing'
        })
    }

    if(persons.find(p => p.name === body.name)) {
        return response.status(400).json({
            error: 'name must be unique'
        })
    }

    const newPerson = {
        id: generateId(),
        name: body.name,
        number: body.number
    }

    persons = persons.concat(newPerson)
    response.json(newPerson)
})

app.delete('/api/persons/:id', (request, response) => {
    const id = request.params.id
    persons = persons.filter(person => person.id !== id)

    response.status(204).end()
})

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})