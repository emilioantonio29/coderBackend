import express from 'express';

const mascotas = []
let nextIdmascotas = 0
// funcion para crear el router, cargar el middleware para convertir la tira de string del request a json, carga las rutas y vincula al manejador con el array de mascotass
function crearRouterMascotass(){
    
    const routermascotas = express.Router()
    routermascotas.use(express.json())

    routermascotas.get('/', (req, res) =>{
        res.json(mascotas)
    })
    routermascotas.post("/", (req, res)=>{
        const nuevaMascota= req.body
        nuevaMascota.id = nextIdmascotas++
        mascotas.push(nuevaMascota);
        res.json(nuevaMascota);
    })
    return routermascotas;

}
export {crearRouterMascotass}