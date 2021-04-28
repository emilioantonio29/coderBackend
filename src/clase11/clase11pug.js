////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/*
CLASE 11

view engine: motor que procesa las vistas


*/
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import express from 'express';
import multer from 'multer';
import { crearRouterApiProductos } from './RouterApiClase11.js';
import { crearRouterPlantilla11 } from './RouterPlantilla11.js';
const app = express(); 
import fs from "fs";
import handlebars from "express-handlebars"
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// app.use('/api', crearRouterApiProductos())
// app.use('/', crearRouterHandlebarsProductos())
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


/*////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// CLASE 10
//const fs = require('fs'); // este motor requiere el modulo fs 
// app.engine('ntl', function (filePath, options, callback) { // define el motor de plantilla
//   fs.readFile(filePath, function (err, content) {
//     if (err) return callback(new Error(err));
//     const rendered = content.toString().replace('#title#', ''+ options.title +'')
//     .replace('#message#', ''+ options.message +'');
//     return callback(null, rendered);
//   });
// });
// app.set('views', './views'); // especifica el directorio de vistas
// app.set('view engine', 'ntl'); // registra el motor de plantillas


// app.get("/prueba", (req, res) => {
//     res.render("prueba.ntl", {
//         title: "Titulo desde ntl",
//         message: "mensaje desde ntl",
//     });
// });
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
app.engine("hbs",
    handlebars({
        extname: "hbs",
        defaultLayout: "layout.hbs", //opcional: en caso de no estar configurado llama al main.hbs
        layoutDir: "/views",
        partialsDir:  "/views",
    })
);


  app.set('views', './views'); // especifica el directorio de vistas
  app.set('view engine', 'pug'); // registra el motor de plantillas
  
  
//   app.get("/prueba3", (req, res) => {
//       res.render("prueba3", {
//           titulo: "titulo HBS",
//           mensaje: "probando HBS",
//           autor: "Emilio",
//           version: "1.1",
//       });
//   });
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
*/

/*
CLASE 11: PRACTICA EJS
    Sintaxis básica (etiquetas)
    <%    Etiqueta 'Scriptlet' para control de flujo sin salida
    <%=   Envía el valor a la plantilla (HTML escapado) 
    <%-   Muestra el valor sin escape en la plantilla
    ejemplo:
    <% if(message) {%>
        <h2><%= message.name %></h2>
    <% } %>

*/
app.set('views', './views'); // especifica el directorio de vistas
app.set('view engine', 'pug'); // registra el motor de plantillas

app.get("/datos",(req,res)=>{
    res.render("nivel",req.query)
});
//querystring http://localhost:7001/datos?min=0&max=200&nivel=75&titulo=%3Ci%3EMedidor%3C/i%3E


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const PORT = 7001
const server = app.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puert ${server.address().port}`)
})
server.on('error',(error) => {console.log(`error: ${error.message}`)})
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
