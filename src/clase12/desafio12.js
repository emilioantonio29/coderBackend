/*
DESAFIO 12 websocket:

Consigna:  Modificar el último entregable para que disponga de un canal de websocket que permita representar, por debajo del formulario de ingreso, una tabla con la lista de productos en tiempo real. 
Puede haber varios clientes conectados simultáneamente y en cada uno de ellos se reflejarán los cambios que se realicen en los productos sin necesidad de recargar la vista.
Cuando un cliente se conecte, recibirá la lista de productos a representar en la vista.

Aspectos a incluir en el entregable:
Para construir la tabla dinámica con los datos recibidos por websocket emplear las siguientes opciones:
1) Utilizar template string
2) Utilizar Handlebars en el frontend (compiler + runtime)

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
app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.engine("hbs",
    handlebars({
        extname: "hbs",
        defaultLayout: "layout.hbs", //opcional: en caso de no estar configurado llama al main.hbs
    })
);

app.set('views', './public/clase12'); // especifica el directorio de vistas
app.set('view engine', 'hbs'); // registra el motor de plantillas

//get
app.get('/', (req, res) =>{
    res.render("index");
});

//post
app.post("/", (req, res)=>{
    const data = req.body;
    data.id = productos.length +1;
    productos.push(data);
    // res.status(200).json(data);
    // res.render("productos", {
    //     USERS_DB
    // });
    // res.redirect("/productos")
})  

const bienvenida ="hola"
// Con el ON se puede acceder a cualquier tipo de evento; hay mas eventos que se pueden ver en la documentacion
io.on('connection', socket => { //"connection" se ejecuta la primera vez que se abre una nueva conexión
    console.log('nuevo cliente conectado') // Se imprimirá solo la primera vez que se ha abierto la conexión    

    // envio los mensajes al cliente que se conecto
    socket.emit('productos', productos)
    // socket.emit("productos", productos_db)

    // escucho los mensajes enviado por el cliente y los envio tipo broadcast   
    socket.on("act", data=>{
        productos.push(data)
        io.sockets.emit('productos', productos);
    })

})


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const PORT = 7001
const connectedServer = httpServer.listen(PORT, () => {
    console.log(`Servidor http con socket escuchando en el puerto ${connectedServer.address().port}`)
})
connectedServer.on('error',(error) => {console.log(`error: ${error.message}`)})