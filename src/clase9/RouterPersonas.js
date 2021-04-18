import express from 'express';

const personas = [
    {
        test: "hola",
        test2:"hola2"
    },
    {
        test: "hola",
        test2:"hola2"
    }
]
let nextIdpersona = 0
// funcion para crear el router, cargar el middleware para convertir la tira de string del request a json, carga las rutas y vincula al manejador con el array de personas
function crearRouterPersonas(){
    
    const routerPersonas = express.Router()
    routerPersonas.use(express.json())

    routerPersonas.get('/test', (req, res) =>{
        res.json(personas)
    })
    routerPersonas.post("/test", (req, res)=>{
        const nuevaPersona= req.body
        nuevaPersona.id = nextIdpersona++
        personas.push(nuevaPersona);
        res.json(nuevaPersona);
    })

    return routerPersonas;
}
export {crearRouterPersonas}