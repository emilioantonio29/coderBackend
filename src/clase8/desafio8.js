////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// CONSIGNA: Realizar un proyecto de servidor basado en node.js que permita listar e incorporar ítems dentro de un array de productos en memoria.
// Cada producto estará representado por un objeto con el siguiente formato
// {
//     title: (nombre del producto),
//     price: (precio),
//     thumbnail: (url al logo o foto del producto)
// }
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Aspectos a incluir en el entregable:
// Implementar las rutas get y post en conjunto con las funciones necesarias (utilizar clases y un módulo propio).
// Cada ítem almacenado dispondrá de un id proporcionado por el backend, que se irá incrementando a medida de que se incorporen productos. 
//      Ese id será utilizado para identificar un producto que va a ser listado en forma individual.
// Las rutas propuestas serían las siguientes:
// A. Listar en forma total (get) : '/api/productos' -> devuelve array de productos
// B. Listar en forma individual (get) (por id): '/api/productos/:id' -> devuelve producto listado
// C. Almacenar un producto (post) : '/api/productos' -> devuelve producto incorporado
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Para el caso de que se liste en forma individual un producto que no exista, se devolverá el objeto: {error : 'producto no encontrado'}
// En caso de no haber productos en el listado total, se retornará el objeto: {error : 'no hay productos cargados'}
// Las respuestas del servidor serán en formato JSON. La funcionalidad será probada a través de Postman.
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Aclaración: 
// El servidor debe estar basado en express y debe implementar los mensajes de conexión al puerto 8080 y en caso de error, representar la descripción del mismo.
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


import express from 'express';


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//crea la aplicacion
const app = express(); 

// configurando el puerto 0, el servidor inicia en un puerto al azar que este libre
const PORT = 7001

const server = app.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puert ${server.address().port}`)
})

server.on('error',(error) => {console.log(`error: ${error.message}`)})
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Para que nuestro servidor express pueda interpretar en forma automática mensajes de tipo JSON en formato urlencoded al recibirlos
app.use(express.json());
app.use(express.urlencoded({extended: true}))
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

let USERS_DB = [
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
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//HOME
app.get("/", (req, res)=>{

    res.json({API:{
        GetTotal: "Listar en forma total (metodo get): '/api/productos' -> devuelve array de productos",
        GetIndividual: "Listar en forma individual (metodo get) (por id): '/api/productos/:id' -> devuelve producto listado",
        PostProducto: "Almacenar un producto (post): '/api/productos' -> devuelve producto incorporado"
    }})
})

//obtener datos
app.get("/api/productos", (req, res)=>{
    if(USERS_DB.length<1){
        res.json({error: "no hay productos agregados"})
    }
    res.json(USERS_DB)
})
app.get("/api/productos/:id", (req, res)=>{
    const {id} = req.params
    const user = USERS_DB.filter(user => user.id == parseInt(id))[0];
    if(user){
        res.json(user)
    }
    res.json({error: "Producto no encontrado"})
})
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//enviar datos
app.post("/api/productos", (req, res)=>{
    const data = req.body;
    console.log(data)
    data.id = USERS_DB.length +1;
    USERS_DB.push(data);
    res.status(201).json(data);
})
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// REQUESTS
// home
// http://localhost:7001/

// GET: productosALL
// http://localhost:7001/api/productos

// GET: productosId
// http://localhost:7001/api/productos/4

// POST: saveProduct
// http://localhost:7001/api/productos

// {
// 	"title": "Milo de Escorpio",
//     "price": 3350,
//     "thumbnail": "test"
// }