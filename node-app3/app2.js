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
           responseIndex(request, response)
            break;

        case"/other":
            responseOther(request, response)
            break;

        default:
            response.writeHead(404, {"Context-Type": "text/plain"});
            response.end("404 Not found");
            break;
    }
}

function responseIndex(request, response) {
    const msg = "これはIndexページです。";
    const content = pug.renderFile("index2.pug", {
        title: "Index",
        content: msg,
    });
    response.writeHead(200, {"Content-Type": "text/html"});
    response.write(content);
    response.end();
}

function responseOther(request, response) {
    let msg = "これはOtherページです。"

    if (request.method == "POST") {
        let body = "";
        request.on("data", (data) => {
            body += data;
        });

    request.on("end", () => {
        const postData = qs.parse(body);
        msg += `あなたは、「${postData.msg}」と書きました。`;
        const content = pug.renderFile("other2.pug", {
            title: "Other",
            content: msg,
        });
        response.writeHead(200, {"Content-Type": "text/html"});
        response.write(content);
        response.end();
    })
    }
}