////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// >> Consigna: Realizar un proyecto de servidor basado en node.js que utilice el middleware express e implemente tres endpoints en el puerto 8080:

// Ruta get '/items' que responda un objeto con todos los productos y su cantidad total en el siguiente formato: { items: [productos], cantidad: (cantidad: productos) }

// Ruta get '/item-random' que devuelva un producto elegido al azar desde un array de productos que se encuentran en el archivo 'productos.txt'. 
// El formato de respuesta será: { item: {producto} }

// La ruta get '/visitas' devuelve un objeto que indica cuantas veces se visitó la ruta del punto 1 y cuantas la ruta del punto 2. Contestar con el formato:  { visitas : { items: cantidad, item: cantidad } }

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Usar 'productos.txt' del desafío anterior. Ej:
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// > Aclaraciones: 
// Utilizar import para importar las dependencias necesarias.
// Representar por consola el puerto de conexión del servidor y mensajes de error si los hubiese.


import express from 'express';
import fs from "fs";


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


function lecturaProductoLeer(){
    try{
        const contenido =  fs.readFileSync("./src/producto.txt","utf-8")
        return contenido;
    }catch(err){
        console.log(`${err}: EL ARCHIVO NO EXISTE`)
    }
}


// configuracion de metodos: MANERADORES
app.get('/', (req, res)=>{
    res.json({mensaje: "hola home /"})
})

let items = 0
app.get('/items', (req, res)=>{
    items++
    let dato = lecturaProductoLeer()
    let datoScreen = JSON.parse(dato)
    res.json({items:datoScreen,cantidad:datoScreen.length})
})

let itemC = 0
app.get('/item-random', (req, res)=>{
    itemC++
    let dato = lecturaProductoLeer()
    let datoScreen = JSON.parse(dato)
    let azar = Math.floor((Math.random() * datoScreen.length))
    res.json({item: datoScreen[azar]})
})

app.get('/visitas', (req, res)=>{
    res.json({ visitas : { items: `Cantidad de veces visitada: ${items}`, item: `Cantidad de veces visitada: ${itemC}` } })
})



console.log("test")