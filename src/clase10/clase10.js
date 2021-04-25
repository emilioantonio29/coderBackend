/* 

CLASE 10:

Entender qué es un motor de plantillas y su implementación en el backend.
Creación de un motor de plantillas custom.
Configurar y utilizar handlebars en nuestro proyecto de express.
*/

import express from 'express';
import multer from 'multer';
import { crearRouterApiProductos } from './RouterApiClase10.js';
const app = express(); 
import fs from "fs";
import handlebars from 'express-handlebars';
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

app.use('/api', crearRouterApiProductos())
app.use(express.static('public'));

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// MIDDLEWARE TERCEROS - MULTER: nos permite parsear el contenido de la peticion y guardar el documento
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// MULTER:
// 1 .- configurar ruta publica para mostrar el html: app.use(express.static('public'));
// 2 .- MULTER CONFIG: crear el objeto storage:
const storage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'uploads')
    },
    filename:function(req,file,cb){
        cb(null,`${Date.now()}_${file.originalname}`)
    }
})
const upload = multer({storage:storage})
// 3.- Crear la ruta
app.post('/subir', upload.single('miArchivo'),(req,res,next)=>{
    const file = req.file
    if(!file){
        const error = new Error("error subiendo el archivo")
        error.httpStatusCode=400
        return next(error)
    }
    res.send(`Archivo <b>${file.originalname}</b> subido exitosamente`)
})


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// CLASE 10
//const fs = require('fs'); // este motor requiere el modulo fs 
// motor de plantillas custom para express
app.engine('ntl', function (filePath, options, callback) { // define el motor de plantilla
  fs.readFile(filePath, function (err, content) {
    if (err) return callback(new Error(err));
    const rendered = content
    .toString()
    .replace('#title#', ''+ options.title +'')
    .replace('#message#', ''+ options.message +'');
    return callback(null, rendered);
  });
});
app.set('views', './views'); // especifica el directorio de vistas
app.set('view engine', 'ntl'); // registra el motor de plantillas


app.get("/prueba", (req, res) => {
    res.render("prueba.ntl", {
        title: "Titulo desde ntl",
        message: "mensaje desde ntl",
    });
});
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
app.engine('cte', function (filePath, options, callback) { // define el motor de plantilla
    fs.readFile(filePath, function (err, content) {
      if (err) return callback(new Error(err));
      const rendered = content
      .toString()
      .replace("^^titulo$$", options.titulo)
      .replace("^^mensaje$$", options.mensaje)
      .replace("^^autor$$", options.autor)
      .replace("^^version$$", options.version)
      return callback(null, rendered);
    });
  });
  app.set('views', './views'); // especifica el directorio de vistas
  app.set('view engine', 'cte'); // registra el motor de plantillas
  
  
  app.get("/prueba2", (req, res) => {
      res.render("prueba2.cte", {
          titulo: "titulo CTE",
          mensaje: "probando CTE",
          autor: "Emilio",
          version: "1.1",

      });
  });

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/*
VENTAJAS DE HANDLEBAR

desde el lado del servidor
desde el lado del cliente.

INSTALACION CON EXPRESS: npm install express-handlebars

Transformar el primer desafío, pero esta vez la página dinámica la creará el servidor desde handlebars instalado y configurado para trabajar con express.
Utilizar la misma estructura de plantilla HTML dentro de una pagina web con encabezado y el mismo objeto de datos.
El servidor escuchará en el puerto 8080 y el resultado lo ofrecerá en su ruta root.

import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let __dirname = path.resolve(path.dirname(""));

*/ 

// app.engine("hbs",
//     handlebars({
//         extname: "hbs",
//         defaultLayout: "layout.hbs",
//         layoutDir: "/views",
//         partialsDir: "/views/partials",
//     })
// );

//   app.set('views', './views'); // especifica el directorio de vistas
//   app.set('view engine', 'hbs'); // registra el motor de plantillas
  
  
//   app.get("/prueba3", (req, res) => {
//       res.render("prueba3", {
//           titulo: "titulo CTE",
//           mensaje: "probando CTE",
//           autor: "Emilio",
//           version: "1.1",

//       });
//   });






////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const PORT = 7001
const server = app.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puert ${server.address().port}`)
})
server.on('error',(error) => {console.log(`error: ${error.message}`)})
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
