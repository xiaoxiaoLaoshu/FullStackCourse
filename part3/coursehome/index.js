const express = require("express");
const app = express();
app.use(express.json()) // 解析以 json 格式传递过来的数据,传递 json 格式的数据
var morgan = require('morgan')

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

app.get("/api/persons", (req, res) => {
    morgan(':method :url :status :res[content-length] - :response-time ms')
    console.log("----");
    res.json(persons);
});

app.get("/api/info", (req, res) => {
    const date = new Date();
    const number = persons.length;
    const html = `
        <p>Phonebook has info for ${number} people</p>
        <p>${date}</p>
    `;

    res.send(html);
    res.end();
});

app.get("/api/persons/:id", (req, res) => {
    const id = Number(req.params.id);

    const person = persons.find((p) => p.id === id);
    if (person) {
        res.json(person);
    } else {
        res.status(404).end();
    }
});

app.delete("/api/persons/:id", (req, res) => {
    const id = Number(req.params.id);
    persons = persons.filter((person) => person.id !== id);
    res.status(204).end();
});

app.post("/api/persons", (req, res) => {
    const body = req.body;
    getGlobalId = (start, end) => {
        start = Math.ceil(start) + 1;
        end = Math.floor(end);
        return Math.floor(Math.random() * (end - start + 1)) + start; //含最大值，含最小值
    }
    console.log('body', !body)
    if(!body || !body.name || !body.number) {
        if(!body) {
            res.status(404).json({
                error: "missed content"
            })
        } else if(!body.name) {
            res.status(404).json({
                error: "missed name"
            })
        } else {
            res.status(404).json({
                error: "missed number"
            })
        }
        return res.end()
    }
    if(!!persons.find(person => person.name === body.name)) {
        res.status(404).json({
            error: "name must be unique"
        })
        return res.end()
    }
    const id = getGlobalId(Math.max(...persons.map(person => person.id)), 1000000000000)
    const newPerson = {
        ...body,
        id
    }
    persons = persons.concat(newPerson)
    res.json(persons)
});

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`);
});
