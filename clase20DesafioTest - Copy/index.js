/*
    Realizar un proyecto en Node.js que se conecte a la base de datos llamada ecommerce implementada en MariaDB y ejecute las siguientes procesos:
    Debe crear una tabla llamada articulos con la siguiente estructura:
    Campos: 
        - nombre tipo varchar 15 caracteres no nulo
        - codigo tipo varchar 10 caracteres no nulo
        - precio tipo float
        - stock tipo entero
        - id clave primaria autoincrement no nula
    Insertar 5 articulos en esa tabla, con datos de prueba con stocks positivos 
    Listar la tabla mostrando los resultados en la consola
    Borrar el articulo con id = 3
    Actualizar el stock a 0 del articulo con id = 2
*/


const mongoose = require('mongoose')
const Schema = mongoose.Schema

const articulosSchema = new Schema({
  nombre: {type: String, require: true, max:15},
  codigo: {type: String, require: true, max:110},
  precio: Number,
  stock: Number,
  id: Number
})

const ArticulosDAO = mongoose.model('articulos', articulosSchema)

/* ------------------------------------------------------------------ */
/*               Conexión a la base de datos : colegio                */
/* ------------------------------------------------------------------ */
mongoose.connect('mongodb://localhost/ecommerce', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
})
  .then(() => {
    //----------------------------------------------------------------------------
    console.log('==================================================================')
    console.log('Paso 1: Create Table articulos & insert')
    console.log('----------------------------------------------------------------->')
    //----------------------------------------------------------------------------
    ArticulosDAO.create(
        [
          {nombre: 'Leche', codigo: 'AB-12', precio: 120, stock: 24, id: 1},
          {nombre: 'Harina', codigo: 'CD-34', precio: 580, stock: 45, id: 2},
          {nombre: 'DDL', codigo: 'EF-56', precio: 900, stock: 16, id: 3},
          {nombre: 'Fideos', codigo: 'FG-44', precio: 1280, stock: 34, id: 4},
          {nombre: 'Crema', codigo: 'CR-77', precio: 1700, stock: 24, id: 5},
      ])  
      .then(() => {
        //----------------------------------------------------------------------------
        console.log('==================================================================')
        console.log('Paso 2: mostrar Tabla Articulos')
        console.log('----------------------------------------------------------------->')
        //----------------------------------------------------------------------------
      })
      .then(() => {
        return ArticulosDAO.find()
      })
      .then((articulos) => {
        console.log(articulos)
      })
      .then(() => {
        return ArticulosDAO.deleteMany({id: {$eq: 3}})
      })
      .then((articulos) => {
        //----------------------------------------------------------------------------
        console.log('==================================================================')
        console.log('Paso 3: borrar articulo con id 3')
        console.log('----------------------------------------------------------------->')
        //----------------------------------------------------------------------------
        console.log(articulos)
      })
      .then(() => {
        //----------------------------------------------------------------------------
        console.log('==================================================================')
        console.log('Paso 4: Actualizar el stock a 0 del articulo con id = 2')
        console.log('----------------------------------------------------------------->')
        //----------------------------------------------------------------------------
        return ArticulosDAO.updateMany({id: {$lt:3}},{$set:{"stock":0}})
      })
      .then((articulos) => {
        console.log(articulos)
      })
      .then(() => {
        //----------------------------------------------------------------------------
        console.log('==================================================================')
        console.log('RESULTADO FINAL:')
        console.log('----------------------------------------------------------------->')
        //----------------------------------------------------------------------------
        return ArticulosDAO.find()
      })
      .then((articulos) => {
        console.log(articulos)
      })
      .catch(err => { throw new Error(`Error en lectura ${err}`) })
      .finally(() => {
        mongoose.disconnect().catch(err => { throw new Error('error al desconectar la base de datos') })
      })
  })
  .catch(err => { throw new Error(`Error de conexión a la base de datos ${err}`) })
