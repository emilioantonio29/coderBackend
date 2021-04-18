////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Configurar el servicio de recursos estáticos en Express: guardar documentos, imagenes, archivos, fotos en un servidor, y accederlos desde un navegador o cliente conectado al servidor
// Creación y uso de capas middlewares.
// Conocer el mecanismo de envío de datos de un formulario al servidor.
// Subir archivos al servidor
//
// RUTEO express: nos permite subdividir en distintas partes los puntos de acceso al servidor. 
// Ejemplo: recursos para personas, ventas, usuarios, 
/*
    los use son la forma de cargar middlewares: el express.json; todas las peticiones pasan primero por el express.json para transformar la tira de datos a un objeto de JS


    * Middleware a nivel de aplicación: 
    app.use(function (req, res, next) {
        console.log('Time:', Date.now());
        next();
    });


    * Middleware a nivel del Router:
      El middleware de nivel de router funciona de la misma manera que el middleware de nivel de aplicación, excepto que está enlazado a una instancia de express.Router().
        
        const app = express();
        const router = express.Router();

        //funcion middleware sin via de acceso de montaje. El codigo es ejecutado por cada peticion al router
        router.use(function (req, res, next) {
        console.log('Time:', Date.now());
        next();
        });

    * Middleware de manejo de errores: recibe 4 parametros, se puede utilizar para garantizar que todas las peticiones son manejadas. Corre global en la app
    * Middleware incorporado: ya vienen instalados en express (ejemplo el use.json) (app.use('/', express.static('public'));)
    * Middleware de terceros: pueden instalarse con npm install (ejemplo: cookie-parser)

*/ 
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import express from 'express';
import multer from 'multer';
import { crearRouterMascotass } from './RouterMascotas.js';
import { crearRouterPersonas } from './routerPersonas.js';
const app = express(); 
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Crear un servidor que permita manejar una lista de mascotas y personas. Debe poseer dos rutas principales: '/mascotas' y '/personas', 
//     las cuales deben incluir métodos para listar y para agregar recursos:
// GET: devolverá la lista requerida en formato objeto.
// POST: permitirá guardar una persona ó mascota en arrays propios en memoria, con el siguiente formato: 
// Persona -> { "nombre": ..., "apellido": ..., "edad":... }
// Mascota -> { "nombre":..., "raza":..., "edad":... }
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Partiendo del ejercicio anterior, generar una carpeta pública 'public' en el servidor, la cual tendrá un archivo index.html. 
// En ese archivo se encontrarán dos formularios: uno que permita ingresar mascotas y otro personas utilizando el método post
// Probar el ingreso de datos mediante los formularios y con Postman
// Verificar los datos cargados en cada caso.
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Crear un servidor que permita elegir y subir un archivo utilizando un formulario servido desde su espacio público.
// Dicho archivo se almacenará en una carpeta propia del servidor llamada 'uploads'.
// El nombre del archivo guardado se formará con el nombre original anteponiéndole un timestamp (Date.now()) seguido con un guión. Ej: 1610894554093-clase1.zip
// Utilizar express y multer en un proyecto de servidor que escuche en el puerto 8080.
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


app.use('/personas', crearRouterPersonas())
app.use('/mascotas', crearRouterMascotass())
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




const PORT = 7001
const server = app.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puert ${server.address().port}`)
})
server.on('error',(error) => {console.log(`error: ${error.message}`)})
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
