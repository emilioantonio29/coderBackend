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

const schemaUsuario = new mongoose.Schema({
    nombre: {type: String, require: true, max:100},
    apellido: {type: String, require: true, max:100},
    email: {type: String, require: true, max:100},
    usuario: {type: String, require: true, max:100},
    contraseña: {type: Number, require: true},
})

//administrar entidades que van a formar parte del sistema: para cargar un modelo le paso nombre del modelo y nombre del esquema
// dao: objeto de acceso a datos
const daoUsuarios = mongoose.model('usuarios', schemaUsuario);

const url = 'mongodb://localhost:27017/ecommerce'
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
        daoUsuarios.create({
            nombre: 'Emilio',
            apellido: 'Martinez',
            email: 'emilio@test.com',
            usuario: 'emilioUser',
            contraseña: '123456'
        }, (err,res) =>{
            if(err){
                console.log(err)
            }else{
                console.log(res)
                daoUsuarios.find({},(err, res)=>{
                    if(err){
                        console.log(err)
                    }else{
                        console.log(res)
                    }
                mongoose.disconnect(err => console.log("desconectado de la base"))
                })
            }
        })

        /*----------------------------------
        |    disconect with callback       |
        ----------------------------------*/ 
        //mongoose.disconnect(err => console.log("desconectado de la base"))
    }
})