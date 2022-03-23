// Get HTML elements
const input = document.querySelector('.text');
const form = document.querySelector('.form');
const span = document.querySelector('.span');

// Connect to the websocket server
let ws = new WebSocket("ws://localhost:8080");
// On message from Server, show it in the HTML
ws.onmessage = message => {
    span.innerHTML = message.data
};

// Get the text from the input live
let text = [];
input.addEventListener('input', event => {
    if(event.data === null && event.inputType === 'deleteContentBackward') {
        text.pop();
        return;
    } 
    text.push(event.data);
});

// On submit, send data to the websocket server, which will be logged on the backend
form.addEventListener('submit', event => {
    event.preventDefault();
    let finalText = text.join('');
    ws.send(finalText)
});