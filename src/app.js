//npm para gestionar librerias
//express: permitir realizar funciones igual que el modulo http

// Realizar un proyecto en node.js que permita calcular cuantos años y días totales transcurrieron desde la fecha de tu nacimiento. 
//Para ello utilizar la dependencia moment instalándola en forma local desde npm. Imprimir los resultados por consola.

// Un ejemplo de salida:
// Hoy es 11/01/2021
// Nací el 29/11/1968
// Desde mi nacimiento han pasado 52 años.
// Desde mi nacimiento han pasado 19036 días.

// Config:
// npm init -y
// Si queremos utilizar los modulos de ES6, agregamos el siguiente tipo de proyecto { "type": "module", -> en el package.json
// npm i momento -S // el -S lo guarda en el package.json
// START NODE: puedo agregar un script para iniciar el programa; en lugar de utilizar node app.js, puedo configurar que se inicialice con el comando start
// "scripts": {
//     "start": "node app.js"
//   },

// ACTUALIZACIONES de los paquetes; las dependencias se pueden configurar de acuerdo a los simbolos que preceden a la version ( ~ ^ * )
// Si escribimos en nuestro package.json: ~0.13.0 
// Cuando salga la versión 0.13.1 se actualizará en nuestro proyecto, ya que es un Patch.
// Cuando salga la versión 0.14.0 no se actualizará, ya que es una Minor Release.
// Cuando salga la versión 1.1.0 no se actualizará, ya que es una Major Release.



import moment from 'moment';
import fs from "fs";



const time = moment.now()
console.log(moment().format('MMMM Do YYYY, h:mm:ss a'))


const read = () =>{
    try{
        const data = fs.readFileSync("./src/productoT.txt", "utf-8");
        // let a = JSON.parse(data)
        console.log(data) 
        // console.log(a) 
    }catch(err){
        console.log(err)
    }
}
read()