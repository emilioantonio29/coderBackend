/*

- Reformar el ejercicio anterior utilizado Faker para generar los objetos con datos aleatorios en español.
- A la ruta '/test' se le podrá pasar por query params la cantidad de objetos a generar.
    Ej: '/test?cant=30'. 
- De no pasarle ningún valor, producirá 10 objetos.
- Incorporarle id a cada uno de los objetos generados en forma incremental, empezando por 1.

En Faker podemos generar los datos en varios idomas

*/
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import express from 'express';
import faker from 'faker'
faker.locale = 'es'
const app = express(); 



////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// const nombres = ['Luis','Lucia','Juan','Augusto','Ana']
// const apellidos = ['Pieres','Cacurri','Bezzola','Alberca','Mei']
// const colores = ['rojo','verde','azul','amarillo','magenta']

// function getRandomElement(arr){
//     const size = arr.length
//     return arr[Math.floor(arr.length * Math.random())]
// }

function crearAzar(id){
    return {
        id,
        nombre: faker.name.firstName(),
        apellido: faker.name.lastName(),
        color: faker.commerce.color()
    }
}


app.get('/test',(req, res) =>{
    const cant = Number(req.query.cant) || 10 // operador para check de null; en caso de que el valor venga en null asigna 10
    res.json(Array.from(new Array(cant), (v,i)=>crearAzar(i+1)))
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