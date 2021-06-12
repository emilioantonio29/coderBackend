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
app.use(express.json())

class MockApi{
    constructor(){
        this.usuarios = usuarios = []
    }

    popular(n = 50){
        for(let i = 0; i<n;i++){
            this.usuariios.push(generarUsuarios())
        }
    }

    agregar(usuarios){
        this.usuarios.push(usuario)
    }
    obtenerTdoos(){
        return [... this.usuarios]
    }
    obtenerporID(id){
        return this.usuarios.find(x=>x.id===id)
    }
    actualizar(id,campos){
        const index = this.usuarios.findIndex(x=>x.id===id)
        if(index === -1){
            //no lo encontré
        }else{
            const usuariosActualizado = {... this.usuarios[index], ...campos}
            this.usuarios[index] = usuariosActualizado
        }
    }
    borrar(id){
        const index = this.usuarios.findIndex(x=>x.id===id)
        if(index === -1){
            //no lo encontré
        }else{
            this.usuarios.splice(index, 1)
        }
    }

}
const usuarios = []


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// const nombres = ['Luis','Lucia','Juan','Augusto','Ana']
// const apellidos = ['Pieres','Cacurri','Bezzola','Alberca','Mei']
// const colores = ['rojo','verde','azul','amarillo','magenta']

// function getRandomElement(arr){
//     const size = arr.length
//     return arr[Math.floor(arr.length * Math.random())]
// }

function generarUsuarios(id){
    return {
        id,
        nombre: faker.name.firstName(),
        apellido: faker.name.lastName(),
        color: faker.commerce.color()
    }
}

cons api = new MockApi()


app.get('/test',(req, res) =>{
    if(req.params.id){

    }else{
        res.json(api.obtenerTdoos())
    }
})

app.post('/test',(req, res) =>{
    res.json([1,2,3])
})

app.put('/test',(req, res) =>{
    res.json([1,2,3])
})

app.delete('/test',(req, res) =>{
    res.json([1,2,3])
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