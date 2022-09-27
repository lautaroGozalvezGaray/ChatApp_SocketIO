//CLIENTE

const socket = io();

const button = document.getElementById("send");
const input = document.querySelector("input");

button.addEventListener("click", ()=>{
    //const user = socket.id + input.value
    socket.emit("response", input.value);
})

socket.on("hello", (data) => {
    console.log(data);

    socket.emit("response", `ESTADO: en linea`)
})

//escuchar evento repuesta_server del lado del servidor

socket.on("response_server", (data) => {
    const mensasjes = data.map(item => `<li> user ${item.socketId}:  ${item.message}</li>`);
    const ul = document.querySelector("ul");
    ul.innerHTML=mensasjes.join("")
})