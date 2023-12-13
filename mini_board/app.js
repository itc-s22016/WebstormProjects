const http = require("node:http");
const fs = require("node:fs");
const pug = require("pug");
const qs = require("node:querystring");

const maxNum = 10;
const filename = "mydata.txt";
let messageData;
readFromFile(filename);




const server = http.createServer(getFromClient);
server.listen(3000);
console.log('Server start!');

function getFromClient(request, response) {
    const url = new URL(request.url, `http://${request.headers.host}`);

    switch (url.pathname) {
        case '/':
            responseIndex(request, response);
            break;

        case '/login':
            responseLogin(request, response);
            break;

        default:
            response.writeHead(404, {"Content-Type": "text/plain"});
            response.end("404 Not found ...");
            break;
    }
}

function responseLogin(request, response) {
    const content = pug.renderFile("./login.pug");
    response.writeHead(200, {"Content-Type": "text/html"});
    response.write(content);
    response.end();
}

function responseIndex(request, response) {
    if (request.method === "POST") {
        let body = "";

        request.on('data', (Kdata) => {
            body += data;
        });

        request.on("end", () => {
            const data = qs.parse(body);
            addToData(data.id, data.msg, filename);
            writeIndex(request, response);
        });
    } else {
        writeIndex(request, response);
    }}

function writeIndex(request, response) {
        const msg = "※なにかメッセージをかいてください。";
        const content = pug.renderFile("./index.pug", {
            title: "Index",
            content: msg,
            data: messageData,
        });
        response.writeHead(200, {"Content-Type": "text/html"});
        response.write(content);
        response.end();
}

function readFromFile(filename) {
        fs.readFile(filename, "utf-8", (err, data) => {
            if (data.length === 0) {
                messageData = [];
            } else {
                messageData = JSON.parse(data);
            }
        });
}


    function addToData(id, msg, filename) {
        const obj = {id, msg};
        console.log(`add data: ${obj}`);
        messageData.unshift(obj);
        if (messageData.length > maxNum) {
            messageData.pop();
        }
        saveToFile(filename);
    }

    function saveToFile(filename) {
        const data = JSON.stringify(messageData);
        fs.writeFile(filename, data, (err) => {
            if (err) {
                throw err;
            }
        });
    }
