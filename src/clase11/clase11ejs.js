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
CLASE 11: PRACTICA PUG
Realizar un servidor que reciba por query params (mediante la ruta get '/datos') el valor que debe representar una barra de medición (usando el tag de html meter). 
Asimismo recibirá además los valores mínimos y máximos permitidos y el título que se pondrá por arriba de la barra, en un elemento h1 en color azul (debe permitir formato HTML).

Ejemplo de petición:
http://localhost:8080/datos?min=10&nivel=15&max=20&titulo=<i>Medidor</i>

Como respuesta a este request, el servidor devolverá al frontend una plantilla armada con los datos recibidos.
Utilizar pug integrado a express, manejando una plantilla común y una particular con la representación requerida.
*/
app.use(express.urlencoded({extended: true}))
app.set('views', './views'); // especifica el directorio de vistas
app.set('view engine', 'ejs'); // registra el motor de plantillas

app.get("/datos",(req,res)=>{
    res.render("nivel",req.query)
});
app.get("/test",(req,res)=>{
    res.render("nivelTest",req.query)
});
//querystring http://localhost:7001/datos?min=0&max=200&nivel=75&titulo=%3Ci%3EMedidor%3C/i%3E

/*EJERCICIO 2:

Desarrollar un servidor basado en node.js, express y ejs que disponga de un formulario en su ruta raíz (creado con una plantilla de ejs) para ingresar 
los siguientes datos de una persona: nombre, apellido y edad. 

La información será enviada mediante el método post al endpoint '/personas

Representar por debajo del mismo formulario los datos históricos ingresados más el actual en forma de tabla. En el caso de no encontrarse información mostrar el mensaje 
'No se encontraron datos' en lugar de la tabla.

Se recomienda el uso de bootstrap en los estilos de las plantillas.
*/
const personas = []
app.get("/inicio",(req,res)=>{
    res.render("inicio",{personas})
});

app.post("/personas",(req,res)=>{
    personas.push(req.body)
    console.log(personas)
    res.redirect("/inicio")
})


// const personas = []

// app.get("/inicio",(req,res)=>{
//     res.render("inicio",{personas})
// });

// app.post("/personas", (req, res)=>{
//     personas.push(req.body)
//     console.log(personas)
//     res.redirect("/inicio")
// })

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const PORT = 7001
const server = app.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puert ${server.address().port}`)
})
server.on('error',(error) => {console.log(`error: ${error.message}`)})
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
