////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/*
DESAFIO 9:
Sobre el proyecto entregable de la clase anterior, incorporar las siguientes rutas:
Actualizar un producto (put) : '/api/productos/:id' -> devuelve producto actualizado
Borrar un producto (delete) : '/api/productos/:id' -> devuelve producto eliminado

El formato del objeto a actualizar será:
{
    title: (nombre del producto),
    price: (precio),
    thumbnail: (url al logo o foto del producto)
}

Aspectos a incluir en el entregable:
Implementar las rutas put y delete junto a las funciones necesarias (utilizar la estructura ya creada).
Incorporar el Router de express en la url base '/api' y configurar todas las subrutas en base a este.
Crear un espacio público de servidor que contenga un documento index.html con un formulario de ingreso de productos con los datos apropiados.
Probar la funcionalidad con Postman y el formulario de ingreso de datos.

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
DESAFIO 10:
Consigna:  Sobre el proyecto entregable de la clase anterior, incorporar y configurar el motor de plantillas handlebars para que permita 
ver mediante la ruta get '/productos/vista' los productos cargados.

Aspectos a incluir en el entregable:
- Realizar las plantillas correspondientes que permitan recorrer el array de productos y representarlo en forma de tabla dinámica, siendo sus cabeceras el nombre de producto, el precio y su foto (la foto se mostrará como un imágen en la tabla)
- En el caso de no encontrarse datos, devolver el mensaje: 'No hay productos'
- Utilizar bootstrap para maquetar la vista creada por dicho motor de plantillas.
- Maquetar con bootstrap el formulario de ingreso de productos. Al guardar el producto, se debe redirigir la vista al formulario vacío.

Sugerencias: 
- Utilizar iconfinder (https://www.iconfinder.com/free_icons) para obtener la url de las imágenes de los productos (click derecho sobre la imagen -> copiar dirección de la imagen)
- Probar desde postman las demás funciones (actualizar y borrar producto) y ver el resultado reflejado en la tabla de productos.


*/
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import express from 'express';
import multer from 'multer';
import { crearRouterApiProductos } from './RouterApiDesafio10.js';
import { crearRouterHandlebarsProductos } from './RouterHandlebars.js';
const app = express(); 
import fs from "fs";
import handlebars from "express-handlebars"
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

app.use('/api', crearRouterApiProductos())
app.use('/', crearRouterHandlebarsProductos())
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
  app.set('view engine', 'hbs'); // registra el motor de plantillas
  
  
//   app.get("/prueba3", (req, res) => {
//       res.render("prueba3", {
//           titulo: "titulo HBS",
//           mensaje: "probando HBS",
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
