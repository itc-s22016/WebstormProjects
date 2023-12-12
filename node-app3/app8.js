const http = require("http");
const fs = require("fs");
const pug = require("pug");
const qs = require("querystring");

const server = http.createServer(getFromClient);
server.listen(3000);
console.log("Server start!");

const data = {
    "Taro": "09-999-999",
    "Hanako": "080-888-888",
    "Sachiko": "070-777-777",
    "Ichiro": "060-666-666"
}

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
    const content = pug.renderFile("index8.pug", {
        title: "Index",
        content: msg,
        data:data,
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