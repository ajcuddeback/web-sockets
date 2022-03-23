// Require http module
const http = require("http");
// Require Websocket Server
const WebSocketServer = require("websocket").server;
let connection = null;

// Create an HTTP server
const httpServer= http.createServer((req, res) => {
    console.log("we have received a request!");
});

// Create a WebSocket Server that uses the HTTP server we made
const websocket = new WebSocketServer({
    "httpServer": httpServer
});

// On a WebSocket Request...
websocket.on("request", request => {
    // Accept the Request and set it to connection
    // (In the accept method, you can lock down with parameters like allowed origin.)
    connection = request.accept(null, request.origin);
    
    // On connection open, log Opened
    connection.on("open", () => console.log("Opened!"));

    // On connection close, log closed
    connection.on("close", () => console.log("Closed!"));

    // When a message hits the connection, print the message
    connection.on("message", message => {
        console.log(`Received message ${message.utf8Data}`);
        // Send the same message back to client
        connection.send(`${message.utf8Data}`);
    });

    sendEvery5Seconds();

});

// Open the Server on Port 8080
httpServer.listen(8080, () => {
    console.log('My server is listening on Port 8080');
});

// Send a message every 5 Seconds of a random number
const sendEvery5Seconds = () => {
    connection.send(`Message ${Math.random()}`);

    setTimeout(sendEvery5Seconds, 5000);
}