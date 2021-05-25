```sequence
title: 用户进入单页面的网络请求过程
participant 浏览器 as browser
participant 服务端 as server

browser -> server: HTTP GET https://studies.cs.helsinki.fi/exampleapp/spa
server --> browser: HTML-code
browser -> server: HTTP GET https://studies.cs.helsinki.fi/exampleapp/main.css
server --> browser: main.css
browser -> server: HTTP GET https://studies.cs.helsinki.fi/exampleapp/spa.js
server --> browser: spa.js

NOTE right of browser: 浏览器请求数据，数据格式是 json

browser -> server: HTTP GET https://studies.cs.helsinki.fi/exampleapp/data.json

NOTE left of server: 服务端响应请求，返回数据

server --> browser: [{ content: "jkjhjk,h", data:"2021-04-08T18:03:44.546Z"}, ...]
browser -> server: HTTP GET https://studies.cs.helsinki.fi/favicon.ico
server --> browser: favicon.ico

NOTE over browser: 浏览器页面输入数据,然后将输入的数据发送个服务端

browser --> server: HTTP POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa

```