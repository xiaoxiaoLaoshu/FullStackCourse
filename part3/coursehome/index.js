const express = require("express");
const app = express();

var persons = [
    {
        name: "Arto Hellas",
        number: "040-123456",
        id: 1,
    },
    {
        name: "Ada Lovelace",
        number: "39-44-5323523",
        id: 2,
    },
    {
        name: "Dan Abramov",
        number: "12-43-234345",
        id: 3,
    },
    {
        name: "Mary Poppendieck",
        number: "39-23-6423122",
        id: 4,
    },
    {
        name: "chen",
        number: "123456",
        id: 5,
    },
];

app.get('/api/persons',(req, res) => {
    res.json(persons)
})

app.get('/api/info', (req, res) => {
    const date = new Date()
    const number = persons.length
    const html = `
        <p>Phonebook has info for ${number} people</p>
        <p>${date}</p>
    `

    res.send(html)
    res.end()
})

app.get('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)

    const person = persons.find(p => p.id === id)
    if(person) {
        res.json(person)
    } else {
        res.status(404).end()
    }
})

app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    persons = persons.filter(person => person.id !==  id)
    res.status(204).end()
})

app.post('/api/persons',(req, res) => {
    const body = req.body
    console.log('body', body)
    res.end()
})

const PORT = 3001
app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`);
})