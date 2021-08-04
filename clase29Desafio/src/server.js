// const express = require('express')
// const app = express()
// const server = require('http').Server(app)
// const io = require('socket.io')(server)
// const handlebars = require('express-handlebars');

// app.engine("hbs",
//     handlebars({
//         extname: "hbs",
//         defaultLayout: "layout.hbs", //opcional: en caso de no estar configurado llama al main.hbs
//     })
// );

// app.set('views', './public'); // especifica el directorio de vistas
// app.set('view engine', 'hbs'); // registra el motor de plantillas

// app.use(express.static('public'))
// app.use('/api', crearRouterApiProductos())
// app.use('/', crearRouterPlantilla11())


// server.listen(7001, function() {
//     console.log('Servidor corriendo en http://localhost:8080');
// })
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/*
                        PM2
//tasklist /fi "imagename eq node.exe" -> lista todos los procesos de node.js activos
//taskkill /pid numpid /f -> mata un proceso por su número de PID

//npm i -g pm2
//npm list -g | grep pm2

// -------------- MODO FORK -------------------
//pm2 start server.js --name="ServerX" --watch -- PORT
//pm2 start server.js --name="Server1" --watch -- 8081
//pm2 start server.js --name="Server2" --watch -- 8082

// -------------- MODO CLUSTER -------------------
//pm2 start server.js --name="ServerX" --watch -i max -- PORT
//pm2 start server.js --name="Server3" --watch -i max -- 8083

//pm2 list
//pm2 delete id/name
//pm2 desc name
//pm2 monit
//pm2 --help
//pm2 logs
//pm2 flush

npm run prodPm2



*/
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import express from 'express';
import multer from 'multer';
import { routerApiMongoD } from './routerApiMongoD.js';
import { routerApiMongoDBaaS } from './routerApiMongoDBaaS.js';
import { routerApiSQLite3 } from './routerApiSQLite3.js';
import { routerApiMySql } from './routerApiMySql.js'
// import { routerApiFirebase } from './routerApiFirebase.js';
import { routerRender } from './routerRender.js';
import { routerFaker } from './routerFaker.js'
const app = express(); 
import fs from "fs";
import handlebars from "express-handlebars"
import cluster from 'cluster';
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

app.use('/api/MongoD', routerApiMongoD())
app.use('/api/MongoDBaaS', routerApiMongoDBaaS())
app.use('/api/SQLite3', routerApiSQLite3())
app.use('/api/MySql', routerApiMySql())
app.use('/productos', routerFaker())
app.use('/', routerRender())
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
app.engine("hbs",
    handlebars({
        extname: "hbs",
        defaultLayout: "layout.hbs", //opcional: en caso de no estar configurado llama al main.hbs
    })
);

app.set('views', './public'); // especifica el directorio de vistas
app.set('view engine', 'hbs'); // registra el motor de plantillas

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// const PORT = 7001
// const server = app.listen(PORT, () => {
//     console.log(`Servidor http escuchando en el puert ${server.address().port}`)
// })

//const PORT = parseInt(process.argv[2]) || process.env.PORT || 8080
const PORT = 7001
app.listen(PORT, err => {
    if (!err) console.log(`Servidor express escuchando en el puerto ${PORT} - PID WORKER ${process.pid}`)
})



//server.on('error',(error) => {console.log(`error: ${error.message}`)})
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// para GLITCH:
// server.listen(process.env.PORT, function() {
//     console.log('Servidor corriendo en http://localhost:'+process.env.PORT);
// })