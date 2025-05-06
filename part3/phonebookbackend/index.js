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

app.get('/api/persons/:id', (request, response, next) => {
    const id = request.params.id
    Person.findById(id)
        .then((person) => {
            if(person) {
                response.json(person)
            } 
            else {
                response.status(404).end()
            }
        })
        .catch((error) => next(error))
})

app.post('/api/persons', (request, response) => {
    const body = request.body
    
    if(!body.name || !body.number) {
        return response.status(400).json({
            error: 'name or number missing'
        })
    }

    const newPerson = new Person({
        name: body.name,
        number: body.number
    })

    newPerson.save().then(savedPerson => {
        response.json(savedPerson)
    })
})

app.put('/api/persons/:id', (request, response, next) => {
    const {number} = request.body
    const id = request.params.id

    Person.findByIdAndUpdate(id)
        .then((person) => {
            if(!person) {
                return response.status(404).end()
            }

            person.number = number

            return person.save().then((updatedPerson) => {
                response.json(updatedPerson)
            })
        })
        .catch((error) => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
    const id = request.params.id
    Person.findByIdAndDelete(id)
        .then(result => {
            response.status(204).end()
        })
        .catch(error => {
            next(error)
        })
})

const unknownEndpoint = (request, response) => {
    response.status(404).send({error: 'unknown endpoint'})
}

app.use(unknownEndpoint)

const errorHandler = ((error, request, response, next) => {
    console.error(error.message)

    if(error.name === 'CastError') {
        return response.status(400).send({error: 'malformated id'})
    }

    next(error)
})

app.use(errorHandler)

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})