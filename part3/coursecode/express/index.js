const express = require('express')
const app = express()
app.use(express.json())

const requestMiddle = require('./middleware/requestLogger') 
// const requestLogger = (request, response, next) => {
//     console.log('Method', request.method)
//     console.log('Path', request.path)
//     console.log('Body', request.body)
//     console.log("----");
//     next()
// }


app.use(requestMiddle.requestLogger)
let notes = [
    {
        id: 1,
        content: "HTML is easy",
        date: "2019-05-30T17:30:31.098Z",
        important: true,
    },
    {
        id: 2,
        content: "Browser can execute only JavaScript",
        date: "2019-05-30T18:39:34.091Z",
        important: false,
    },
    {
        id: 3,
        content: "GET and POST are the most important methods of HTTP protocol",
        date: "2019-05-30T19:20:14.298Z",
        important: false,
    },
    {
        content: "afwef",
        data: "2021-05-26T07:48:39.887Z",
        important: false,
        id: 4,
    },
    {
        content: "gegera",
        date: "2021-05-26T08:55:06.881Z",
        important: false,
        id: 5,
    },
    {
        content: "2",
        date: "2021-05-26T09:17:33.303Z",
        important: false,
        id: 6,
    },
    {
        content: "1",
        date: "2021-05-26T09:17:49.126Z",
        important: false,
        id: 7,
    },
    {
        content: "2",
        date: "2021-05-26T09:17:51.150Z",
        important: false,
        id: 8,
    },
    {
        content: "3",
        date: "2021-05-26T09:17:52.295Z",
        important: false,
        id: 9,
    },
    {
        content: "4",
        date: "2021-05-26T09:17:53.240Z",
        important: false,
        id: 10,
    },
    {
        content: "5",
        date: "2021-05-26T09:33:19.407Z",
        important: false,
        id: 11,
    },
];

app.get('/', (req, res) => {
    res.send('<h1>Hello World</h1>')
})

app.get('/api/notes', (req, res) => {
    res.json(notes)
})

app.get('/api/notes/:id', (req, res) => {
    const id = Number(req.params.id)
    console.log('id', id)
    const note = notes.find(n =>   n.id === id)
    if(note) {
        res.json(note)
    } else {
        res.status(404).end()
    }
})

const globalId = () => {
    const maxId = notes.length > 0 ? Math.max(...notes.map(note => note.id)): 0
    return maxId + 1;
}

app.post('/api/notes/', (request, response) => {
    const body = request.body
    
    if(!body.content) {
        return response.status(400).json({
            error: 'content miss'
        })
    }
    const note = {
        id: globalId(),
        content: body.content,
        important: body.important || false,
        date: new Date(),
    }
    
    notes = notes.concat(note)
    response.json(note)
})

app.delete('/api/notes/:id',(request, response) => {
    const id = Number(request.params.id)
    // 使用数组的过滤实现删除操作
    notes = notes.filter(note => note.id !== id)

    response.status(204).end()
})

app.use(requestMiddle.unknownEndpoint)

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})