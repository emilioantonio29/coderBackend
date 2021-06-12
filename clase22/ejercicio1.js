/*

1.- Desarrollar un servidor basado en Node.js y express que para la ruta '/test' responda con un array de 10 objetos, con el siguiente formato:
{
    nombre: '',
    apellido: '',
    color: ''
}

2.- Los objetos generados tendrán un valor aleatorio para cada uno de sus campos. El valor será obtenido de los siguientes arrays:
const nombres = ['Luis', 'Lucía', 'Juan', 'Augusto', 'Ana']
const apellidos = ['Pieres', 'Cacurri', 'Bezzola', 'Alberca', 'Mei']
const colores = ['rojo', 'verde', 'azul', 'amarillo', 'magenta']

3.- Con cada request se obtendrán valores diferentes.

*/
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import express from 'express';
const app = express(); 


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const nombres = ['Luis','Lucia','Juan','Augusto','Ana']
const apellidos = ['Pieres','Cacurri','Bezzola','Alberca','Mei']
const colores = ['rojo','verde','azul','amarillo','magenta']

function getRandomElement(arr){
    const size = arr.length
    return arr[Math.floor(arr.length * Math.random())]
}

function crearAzar(){
    return {
        nombre: getRandomElement(nombres),
        apellido: getRandomElement(apellidos),
        color: getRandomElement(colores)
    }
}


app.get('/test',(req, res) =>{
    const objs = []
    for(let i = 0; i<10; i++){
        objs.push(crearAzar())
    }
    res.json(objs)
})




////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// MIDDLEWARE TERCEROS - MULTER: nos permite parsear el contenido de la peticion y guardar el documento
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});  
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const PORT = 7001
const server = app.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puert ${server.address().port}`)
})
server.on('error',(error) => {console.log(`error: ${error.message}`)})
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// para GLITCH:
// server.listen(process.env.PORT, function() {
//     console.log('Servidor corriendo en http://localhost:'+process.env.PORT);
// })