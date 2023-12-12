const http = require("http");
const fs = require("fs");
const pug = require("pug");

const server = http.createServer(getFromClient);
server.listen();
console.log("Server start!");

function getFromClient(request, response) {
    const url = new URL(request.url, `http://${request.headers.host}`);
    let content = "";
    switch (url.pathname) {
        case "/":
            let body = "これはindexページです。"
            const query = url.searchParams;
            if (query.has("msg") ) {
                body += `あなたは、「${query.get(msg)}」と送りました。`;
        }
            content = pug.renderFile("index1.pug", {
                title: "Index",
                content: body,
            });
            response.writeHead(200, {"Content-Type": "text/html"});
            response.write(content);
            response.end();
            break;

        default:
            response.writeHead(404, {"Context-Type": "text/plain"});
            response.end("404 Not found");
            break;
    }
}