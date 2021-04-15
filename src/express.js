// EXPRESS: LIBRERIA para crear servidores en node
//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// NodeJS cuenta con módulos nativos para manejar el envío y recepción de peticiones de tipo http/s, sin embargo, usaremos para nuestra aplicación un módulo externo llamado express

// Algunas de sus principales características son:
// Es muy popular y fácil de usar.
// Nos facilitará la tarea de crear los distintos puntos de entrada de nuestro servidor.
// También permite personalizar la manera en que se maneja cada petición en forma más simple y rápida.
//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Express es un framework web minimalista, con posibilidad de ser utilizado tanto para aplicaciones/páginas web como para aplicaciones de servicios. 
// Como todo módulo, lo primero que debemos realizar es agregarlo como dependencia en nuestro proyecto
//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Instalación desde la consola:
// npm install express

// Express como framework soporte para servidores REST
// Express nos permite definir, para cada tipo de petición HTTP
// que llegue a una determinada URL, qué acciones debe tomar, mediante la definición de un callback para cada caso que consideremos necesario incluir en nuestra API.
//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// EL SERVIDOR REST devuelve fotos del estado interno del servidor: estado representacional del estado interno del servidor como estructura anidada de objetos
// la comunicacion con un servidor rest es la transferencia de ese estado
//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Express nos permite definir, para cada tipo de petición HTTP
// que llegue a una determinada URL, qué acciones debe tomar, mediante la definición de un callback para cada caso que consideremos necesario incluir en nuestra API.
// API REST interfaz para interactuar con un servidor: Interfaz es la capa intermedia entre un componente y otro componente => organizacion cliente-servidor
// la interfaz responde a diversos lineamientos; en la interfaz de tipo rest (La transferencia de estado representacional) el servidor devuelve una foto del estado interno del estado
// del servidor.

import express from 'express';

//crea la aplicacion
const app = express(); 

// configuracion de metodos: MANERADORES
app.get('/', (req, res)=>{
    res.json({mensaje: "hola /"})
})

app.get('/personas', (req, res)=>{
    res.json({nombre: "Emilio",apellido:"Martinez"})
})

app.get('/tutores', (req, res)=>{
    res.json({nombre: "toto",apellido:"Crack"})
})

// configurando el puerto 0, el servidor inicia en un puerto al azar que este libre
const PORT = 7001

const server = app.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puert ${server.address().port}`)
})

server.on('error',(error) => {console.log(`error: ${error.message}`)})

//Crear un proyecto de servidor http en node.js que utilice la dependencia express, escuche en el puerto 8080 y tenga tres rutas get configuradas:
// A) '/' en esta ruta raíz, el servidor enviará un elemento de título nivel 1 (un h1 en formato HTML) que contenga el mensaje: 'Bienvenidos al servidor express' en color azul.
// B) '/visitas' donde con cada request, el servidor devolverá un mensaje con la cantidad de visitas que se hayan realizado a este endpoint. Por ej. 'La cantidad de visitas es 10'
// C) '/fyh' donde se devolverá la fecha y hora actual en formato objeto: 
// {fyh: '11/1/2021 11:36:04'}


app.get('/raiz', (req, res)=>{
    res.send('<h1 style="color:blue">Bienvenidos al Servidor Express</h1>')
    console.log("----")
})

let visitas = 0
app.get('/visitas', (req, res)=>{
    visitas++
    res.send(`La cantidad de visitas es ${visitas}`)
})

app.get('/fecha', (req, res)=>{
    res.json({fyh: new Date().toLocaleString()})
})