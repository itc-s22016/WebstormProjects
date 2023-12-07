const http = require("http");
const fs = require("fs");
const pug = require("pug");

const server = http.createServer(getFromClient);
server.listen();
console.log("Server start!");

function getFromClient(request, response) {
    const url = new URL(request.url, `http://${request.headers.host}`);

    switch (url.pathname) {
        case "/":
            content = 
            break;
    }
}