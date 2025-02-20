// express library
const express = require('express');
// instance of express
const app = express();

// create the http library - how websockets are created
const http = require('http')
// socket.io
const { Server } = require('socket.io');

// middleware - cors library 
const cors = require('cors');
app.use(cors);

// use express & http to make server
const server = http.createServer(app);

// server!
const io = new Server(server, {
    // specify settings for cors
    cors: {
        // where react runs
        origin: "http://localhost:3000",
        // what methods are we expecting
        methods: ["GET", "POST"]
    }
});

// listener for 1st thing- connection that gets socket
io.on("connection", (socket) => {
    console.log(`User Connected: ${socket.id}`);
    // 2. listen for send message 
    socket.on("send_message", (data) => {
        // 3. emit receive message
        socket.broadcast.emit("receive_message", data);
    //console.log(data);
    });
});

// react runs on 3000
// node index.js 
server.listen(3001, () => {
    console.log('SERVER RUNNING');
}); 