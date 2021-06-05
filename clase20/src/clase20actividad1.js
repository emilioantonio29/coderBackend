/*---------------------------------------------------------
|
|    npm init -y
|    npm i mongoose
|    -- no agregar module TYPE; ejercicios con require
|
-----------------------------------------------------------*/

const {mongo} = require('mongoose')
const mongoose = require('mongoose')

/*----------------------------------
|    Definicion de esquemas        |
----------------------------------*/ 

const schemaEstudiantes = new mongoose.Schema({
    nombre: {type: String, require: true, max:100},
    apellido: {type: String, require: true, max:100},
    edad: {type: Number, require: true},
    dni: {type: String, require: true, max:8, unique: true},
    curso: {type: String, require: true},
    nota: {type: Number, require: true},
})

//administrar entidades que van a formar parte del sistema: para cargar un modelo le paso nombre del modelo y nombre del esquema
// dao: objeto de acceso a datos
const daoEstudiantes = mongoose.model('estudiantes', schemaEstudiantes);

const url = 'mongodb://localhost:27017/colegio'
mongoose.connect(url,{
    /*----------------------------------
    |    DB Conection with callback    |
    ----------------------------------*/ 
    useNewUrlParser: true,
    useUnifiedTopology: true
}, err =>{
    if(err){
        console.log(err)
    }else{
        console.log("conectado a la base")

        /*--------------------------------------------------------------------------------------
        |    create with callback: el ultimo argumento se ejecuta cuando termina la operacion  |
        --------------------------------------------------------------------------------------*/ 
        daoEstudiantes.create([
            { nombre: 'Pedro', apellido: 'Mei', edad: 21, dni: '31155898', curso: '1A', nota: 7 },
            { nombre: 'Ana', apellido: 'Gonzalez', edad: 32, dni: '27651878', curso: '1A', nota: 8 },
            { nombre: 'José', apellido: 'Picos', edad: 29, dni: '34554398', curso: '2A', nota: 6 },
            { nombre: 'Lucas', apellido: 'Blanco', edad: 22, dni: '30355874', curso: '3A', nota: 10 },
            { nombre: 'María', apellido: 'García', edad: 36, dni: '29575148', curso: '1A', nota: 9 },
            { nombre: 'Federico', apellido: 'Perez', edad: 41, dni: '320118321', curso: '2A', nota: 5 },
            { nombre: 'Tomas', apellido: 'Sierra', edad: 19, dni: '38654790', curso: '2B', nota: 4 },
            { nombre: 'Carlos', apellido: 'Fernández', edad: 33, dni: '26935670', curso: '3B', nota: 2 },
            { nombre: 'Fabio', apellido: 'Pieres', edad: 39, dni: '4315388', curso: '1B', nota: 9 },
            { nombre: 'Daniel', apellido: 'Gallo', edad: 25, dni: '37923460', curso: '3B', nota: 2 }
        ], (err,res) =>{
            if(err){
                console.log(err)
            }else{
                console.log(res)
                /*daoEstudiantes.find({},(err, res)=>{
                    if(err){
                        console.log(err)
                    }else{
                        console.log(res)
                    }
                mongoose.disconnect(err => console.log("desconectado de la base"))
                })*/
            }
            mongoose.disconnect(err => console.log("desconectado de la base"))
        })

        /*----------------------------------
        |    disconect with callback       |
        ----------------------------------*/ 
        //mongoose.disconnect(err => console.log("desconectado de la base"))
    }
})