const socket = io(); // Ya podemos empezar a usar los sockets desde el cliente :)

// Cliente: mensaje enviado desde el server
// Ahora continuando con nuestro evento personalizado. Veamos cómo podemos recibir la información en el cliente. En nuestro archivo .js agregamos el siguiente código.

 socket.on('mi_mensaje', data => {
    alert(data)
    document.getElementById("bienvenida").innerText = data
})




// Cliente: mensaje enviado desde el cliente
//También podemos enviar información del cliente al servidor de forma bastante similar. 
//Por ejemplo, supongamos que después de imprimir el alert queremos enviar un mensaje al servidor que notifique que el mensaje fue recibido con éxito.
const input = document.querySelector("input")
input.addEventListener("input", () => {
    socket.emit("mensaje", input.value)
})


socket.on('mensajes', data => {
    document.querySelector("p").innerText = data
})
////////////////////////////////////////////////////////////////////////////////
const input2 = document.getElementById("test")
document.querySelector("button").addEventListener("click", ()=>{
    socket.emit("mensaje2", input2.value)
})


socket.on('mensajes2', msjs => {
    const mensajesHTML = msjs.map(msj => `SocketId: ${msj.socketid} -> Mensaje: ${msj.mensaje}`).join("<br>")
    document.getElementById("ptest").innerHTML = mensajesHTML


})
