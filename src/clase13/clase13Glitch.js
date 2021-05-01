/*
WEBSOCKET 2

Desarrollar una Aplicación Web chat basada en Websocket
Probar la aplicación de chat en ambiente local y en glitch.com
Desarrollar una Aplicación Web paint basada en Websocket
Probar la aplicación de paint en ambiente local y en glitch.com
*/

let productos = [
    {
        title: "Seiya de Pegaso",
        price: 888,
        thumbnail: "https://loscaballerosdelzodiaco.000webhostapp.com/imagenes/seiya3.png",
        id: 1
    },
    {
        title: "Hyoga de Cisne",
        price: 997,
        thumbnail: "https://loscaballerosdelzodiaco.000webhostapp.com/imagenes/cisne.png",
        id: 2
    },
    {
        title: "Shun de Andromeda",
        price: 547,
        thumbnail: "https://loscaballerosdelzodiaco.000webhostapp.com/imagenes/andromeda.png",
        id: 3
    },    
    {
        title: "Ikki de Fenix",
        price: 1050,
        thumbnail: "https://loscaballerosdelzodiaco.000webhostapp.com/imagenes/ikki.png",
        id: 4
    },
    {
        title: "Shiriu del Dragon",
        price: 1020,
        thumbnail: "https://loscaballerosdelzodiaco.000webhostapp.com/imagenes/dragon.png",
        id: 5
    }
]


import express from 'express';
import { Server as HttpServer } from 'http'
import { Server as IOServer } from 'socket.io'
//import { crearRouterPlantilla11 } from './RouterPlantilla11.js';
import handlebars from "express-handlebars"

const app = express()
const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)

//app.use('/', crearRouterPlantilla11())
app.use(express.static('public/clase13'))
app.use(express.json())
app.use(express.urlencoded({extended: true}))

// app.engine("hbs",
//     handlebars({
//         extname: "hbs",
//         defaultLayout: "layout.hbs", //opcional: en caso de no estar configurado llama al main.hbs
//     })
// );

// app.set('views', './public/clase13'); // especifica el directorio de vistas
// app.set('view engine', 'hbs'); // registra el motor de plantillas

//get
app.get('/', (req, res) =>{
    res.render("index");
});


const messages = []
// Con el ON se puede acceder a cualquier tipo de evento; hay mas eventos que se pueden ver en la documentacion
io.on('connection', socket => { //"connection" se ejecuta la primera vez que se abre una nueva conexión
    console.log('nuevo cliente conectado') // Se imprimirá solo la primera vez que se ha abierto la conexión    

    // envio los mensajes al cliente que se conecto
    socket.emit('messages', messages)
    // socket.emit("productos", productos_db)

    // escucho los mensajes enviado por el cliente y los envio tipo broadcast   
    socket.on("new-message", data=>{
        messages.push(data)
        io.sockets.emit('messages', messages);
    })

})


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const PORT = 7001
const connectedServer = httpServer.listen(PORT, () => {
    console.log(`Servidor http con socket escuchando en el puerto ${connectedServer.address().port}`)
})
connectedServer.on('error',(error) => {console.log(`error: ${error.message}`)})

/*
Subirlo a glitch
- subirlo a assets
- copiar url cdn: https://cdn.glitch.com/6c38448a-ea08-4630-9f6e-7657174cd32d%2Fchat.zip?v=1619891350393
- descargar el cdn: wget -0 chat.zip https://cdn.glitch.com/6c38448a-ea08-4630-9f6e-7657174cd32d%2Fchat.zip?v=1619891350393
- descomprimir el zip: unzip chat.zip -d .

*/