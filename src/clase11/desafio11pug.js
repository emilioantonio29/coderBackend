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


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
DESAFIO 11:
Sobre el proyecto entregable de la clase anterior, realizar las siguientes adaptaciones
- Manteniendo la misma funcionalidad reemplazar el motor de plantillas handlebars por pug.
- Manteniendo la misma funcionalidad reemplazar el motor de plantillas handlebars por ejs.
- Por escrito, indicar cuál de los tres motores de plantillas prefieres para tu proyecto. Justificar tu respuesta.

Aspectos a incluir en el entregable:
- Puedes utilizar branches para las consignas 1) y 2) (Optativo) o simplemente hacer dos commits.
- La justificación puede ir escrita al subir la entrega. Si utilizaste branches, puedes enviar al máster la opción seleccionada.


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

app.use('/api', crearRouterApiProductos())
app.use('/', crearRouterPlantilla11())
app.use(express.static('public'));

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// MIDDLEWARE TERCEROS - MULTER: nos permite parsear el contenido de la peticion y guardar el documento
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// PUG
app.set('views', './views'); // especifica el directorio de vistas
app.set('view engine', 'pug'); // registra el motor de plantillas
  
  

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const PORT = 7001
const server = app.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puert ${server.address().port}`)
})
server.on('error',(error) => {console.log(`error: ${error.message}`)})
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
