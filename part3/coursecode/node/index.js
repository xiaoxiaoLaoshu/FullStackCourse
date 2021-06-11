const http = require("http");

const notes = [
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

const app = http.createServer((request, response) => {
    response.writeHead(200, { "Content-Type": "text/plain" });
    response.end(JSON.stringify(notes));
});

const PORT = 3001;
app.listen(PORT);
console.log(`Server running on port ${PORT}`);
