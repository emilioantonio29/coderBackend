/* ------------------------------------------------------------------ */
/*               FIREBASE                                             */
/* ------------------------------------------------------------------ */

/* ------------------------------------------------------------------ */
/*               CONEXION A LA API DE FIREBASE                        */
/* ------------------------------------------------------------------ */
var admin = require("firebase-admin");

var serviceAccount = require("./bd/backend-project-93108-firebase-adminsdk-g78q2-ba1b927f71.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

/* ------------------------------------------------------------------ */
/*                TEST CONEXION
/* ------------------------------------------------------------------ */

// console.log("conectados a firebase")

/* ------------------------------------------------------------------ */
/*               CONEXION A FIRESTORE                                 */
/* ------------------------------------------------------------------ */

const db = admin.firestore();

/* ------------------------------------------------------------------ */
/*               CONEXION A COLLECTION                                */
/* ------------------------------------------------------------------ */

const usuariosCollection = db.collection("usuarios");

//                .THEN
/* ------------------------------------------------------------------ */
// const doc = usuariosCollection.doc("2")
// doc.create({
//   name: "Antonio"
// }).then(res => console.log(res))


// async function createUser(){
//   const doc = usuariosCollection.doc("3")
//   const res = await doc.create({
//     name: "Zun"
//   })
//   console.log(res)
// }
// createUser()
/* ------------------------------------------------------------------ */


/* ------------------------------------------------------------------ */
async function find(){
  const query = await usuariosCollection.get()
  query.docs.map(d=>console.log(d.data()))
}
find()

async function findId(id){
  const doc = await usuariosCollection.doc(id)
  const res = await doc.get()
  console.log("-----------------------")
  console.log(res.data())
}
findId("2")


async function udpateId(id){
  const doc = await usuariosCollection.doc(id)
  const res = await doc.update({
    name: "Antonio",
    edad: 35
  })
  console.log("-----------------------")
  console.log(res)
}
udpateId("2")

async function deleteId(id){
  const doc = await usuariosCollection.doc(id)
  const res = await doc.delete()
  console.log("-----------------------")
  console.log(res)
}
deleteId("3")
/* ------------------------------------------------------------------ */






// const mongoose = require('mongoose')
// const Schema = mongoose.Schema

// const articulosSchema = new Schema({
//   nombre: {type: String, require: true, max:15},
//   codigo: {type: String, require: true, max:110},
//   precio: Number,
//   stock: Number,
//   id: Number
// })

// const ArticulosDAO = mongoose.model('articulos', articulosSchema)

// /* ------------------------------------------------------------------ */
// /*               Conexión a la base de datos : colegio                */
// /* ------------------------------------------------------------------ */
// mongoose.connect('mongodb+srv://emilio:test@coderbackend.xuzrc.mongodb.net/ecommerce?retryWrites=true&w=majority', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
//   useCreateIndex: true
// })
//   .then(() => {
//     //----------------------------------------------------------------------------
//     console.log('==================================================================')
//     console.log('Paso 1: Create Table articulos & insert')
//     console.log('----------------------------------------------------------------->')
//     //----------------------------------------------------------------------------
//     ArticulosDAO.create(
//         [
//           {nombre: 'Leche', codigo: 'AB-12', precio: 120, stock: 24, id: 1},
//           {nombre: 'Harina', codigo: 'CD-34', precio: 580, stock: 45, id: 2},
//           {nombre: 'DDL', codigo: 'EF-56', precio: 900, stock: 16, id: 3},
//           {nombre: 'Fideos', codigo: 'FG-44', precio: 1280, stock: 34, id: 4},
//           {nombre: 'Crema', codigo: 'CR-77', precio: 1700, stock: 24, id: 5},
//       ])  
//       .then(() => {
//         //----------------------------------------------------------------------------
//         console.log('==================================================================')
//         console.log('Paso 2: mostrar Tabla Articulos')
//         console.log('----------------------------------------------------------------->')
//         //----------------------------------------------------------------------------
//       })
//       .then(() => {
//         return ArticulosDAO.find()
//       })
//       .then((articulos) => {
//         console.log(articulos)
//       })
//       .then(() => {
//         return ArticulosDAO.deleteMany({id: {$eq: 3}})
//       })
//       .then((articulos) => {
//         //----------------------------------------------------------------------------
//         console.log('==================================================================')
//         console.log('Paso 3: borrar articulo con id 3')
//         console.log('----------------------------------------------------------------->')
//         //----------------------------------------------------------------------------
//         console.log(articulos)
//       })
//       .then(() => {
//         //----------------------------------------------------------------------------
//         console.log('==================================================================')
//         console.log('Paso 4: Actualizar el stock a 0 del articulo con id = 2')
//         console.log('----------------------------------------------------------------->')
//         //----------------------------------------------------------------------------
//         return ArticulosDAO.updateMany({id: {$lt:3}},{$set:{"stock":0}})
//       })
//       .then((articulos) => {
//         console.log(articulos)
//       })
//       .then(() => {
//         //----------------------------------------------------------------------------
//         console.log('==================================================================')
//         console.log('RESULTADO FINAL:')
//         console.log('----------------------------------------------------------------->')
//         //----------------------------------------------------------------------------
//         return ArticulosDAO.find()
//       })
//       .then((articulos) => {
//         console.log(articulos)
//       })
//       .then(() => {
//         //----------------------------------------------------------------------------
//         console.log('==================================================================')
//         console.log('TEST: traer id mas alto')
//         console.log('----------------------------------------------------------------->')
//         //----------------------------------------------------------------------------
//         return ArticulosDAO.findOne().sort( { id: -1 } )
//       })
//       .then((data) => {
//         console.log(data.id)
//       })
//       .catch(err => { throw new Error(`Error en lectura ${err}`) })
//       .finally(() => {
//         mongoose.disconnect().catch(err => { throw new Error('error al desconectar la base de datos') })
//       })
//   })
//   .catch(err => { throw new Error(`Error de conexión a la base de datos ${err}`) })
