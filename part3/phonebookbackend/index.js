require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const Person = require('./models/person')

const app = express()

const port = process.env.PORT

let persons = []

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
    Person.find({}).then((persons) => {
        response.json(persons)
    })
})

app.get('/api/persons/:id', (request, response) => {
    const id = request.params.id
    Person.findById(id).then(person => {
        response.json(person)
    })
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

    const newPerson = new Person({
        // id: generateId(),
        name: body.name,
        number: body.number
    })

    newPerson.save().then(savedPerson => {
        response.json(savedPerson)
    })
})

app.delete('/api/persons/:id', (request, response) => {
    const id = request.params.id
    Person.findByIdAndDelete(id)
        .then(result => {
            response.status(204).end()
        })
        .catch(error => {
            console.log(error)
        })
})


app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})