//SERVIDOR

const express = require('express');
const { Server: HttpServer } = require("http");
const { Server: IOServer } = require("socket.io");



const app = express()
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);


app.use(express.json())

app.use(express.static("public"));

app.get("/", (req, res) => {
    res.sendFile("index.html", {root: __dirname});

})


const arrayMessage = [];

io.on("connection", (socket) => {
    console.log(`a new user connected with id: ${socket.id}`);

    socket.emit("hello", "hello from server")

    //escucha del evento respuesta del lado del cliente
    socket.on("response", (data) => {
        arrayMessage.push({socketId: socket.id, message: data});
        io.sockets.emit("response_server", arrayMessage)
    })

    //detecta la desconexion 
    socket.on("disconnect", () => {
        console.log(`a user disconnected with id: ${socket.id}`);
    })
})







const port = 8080;

const server = httpServer.listen(port, ()=>{
    console.log(`listen on port ${server.address().port}`);
})


