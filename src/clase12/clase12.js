/*
CLASE 12 websocket:

Comprender la diferencia entre HTTP y Websocket.
Integrar Websocket a nuestro proyecto de Express.
Generar la inicialización sobre el cliente para conectarse al servidor mediante Websocket

Websocket es un protocolo de red basado en TCP que establece cómo deben intercambiarse datos entre redes.
Es un protocolo fiable y eficiente, utilizado por prácticamente todos los clientes.
El protocolo TCP establece conexiones entre dos puntos finales de comunicación, llamados sockets.
De esta manera, el intercambio de datos puede producirse en las dos direcciones.

Install socket.io
import
*/


/*
SERVIDOR CON WEBSOCKET - 1
Desarrollar un servidor basado en express y socketIO. Con cada conexión de cliente, el servidor debe emitir por consola en mensaje: '¡Nuevo cliente conectado!'
*/
import express from 'express';
import { Server as HttpServer } from 'http'
import { Server as IOServer } from 'socket.io'

const app = express()
const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)

app.use(express.static('./public/clase12'))

// Con el ON se puede acceder a cualquier tipo de evento; hay mas eventos que se pueden ver en la documentacion
io.on('connection', socket => { //"connection" se ejecuta la primera vez que se abre una nueva conexión
    console.log('nuevo cliente conectado') // Se imprimirá solo la primera vez que se ha abierto la conexión    

    //WEBSOCKET2
    socket.on("mensaje", data => {
        io.sockets.emit("mensajes",data)
    })

  })


/*
SERVIDOR CON WEBSOCKET - 2
Sobre la estructura anteriormente creada, agregar en la vista de cliente un elemento de entrada de texto donde, al introducir texto, 
éste se muestre instantáneamente en todos los clientes conectados en un párrafo por debajo del input.

Este mensaje se debe actualizar con cada nuevo caracter ingresado por cualquier cliente.
*/
/*
SERVIDOR CON WEBSOCKET - 3
Basado en el ejercicio que venimos realizando, ahora los mensajes enviados por los clientes deberán ser almacenados en el servidor y 
reflejados por debajo del elemento de entrada de texto cada vez que el usuario haga un envío. La estructura de almacenamiento será un array de objetos, 
donde cada objeto tendrá la siguiente estructura:
{ socketid: (el socket.id del que envió el mensaje), mensaje: (texto enviado)}

Cada cliente que se conecte recibirá la lista de mensajes completa.
Modificar el elemento de entrada en el cliente para que disponga de un botón de envío de mensaje.
Cada mensaje de cliente se representará en un renglón aparte, anteponiendo el socket id.

*/



////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const PORT = 7001
const connectedServer = httpServer.listen(PORT, () => {
    console.log(`Servidor http con socket escuchando en el puerto ${connectedServer.address().port}`)
})
connectedServer.on('error',(error) => {console.log(`error: ${error.message}`)})