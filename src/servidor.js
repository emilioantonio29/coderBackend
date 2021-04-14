const http = require('http');
// const { Server } = require('node:http');
const PORT = 9000


const server = http.createServer((req,res)=>{
    const getDecimal = () => {
        let a =  Math.random()*9999.99
        return (Math.round(a * 100) / 100).toFixed(2);
    }
    const getAleatorio = () => {
        return parseInt(Math.random()*10) + 1
    }
    
    const valorId = getAleatorio()
    const valorTitle = `Producto ${getAleatorio()}`
    const valorPrice = getDecimal()
    const valorThumb = `Foto ${getAleatorio()}`
    
    const objeto = {
        id: valorId,
        title: valorTitle,
        price: valorPrice,
        thumbnail: valorThumb
    }
    
    const stringifyed = JSON.stringify(objeto)
    // console.log("recibiendo peticion")
    // console.log(req);
    res.end(stringifyed)

})

server.listen(PORT, ()=>{
    console.log(`ya me conecte al puerto ${PORT}`)
   
})


// npm init
// npm i -g nodemon
// nodemon index.js: al guardar cambios se vuelve a ejecutar el programa
// console.log("test")

// const getDecimal = () => {
//     let a =  Math.random()*9999.99
//     return (Math.round(a * 100) / 100).toFixed(2);
// }
// const getAleatorio = () => {
//     return parseInt(Math.random()*10) + 1
// }

// const valorId = getAleatorio()
// const valorTitle = `Producto ${getAleatorio()}`
// const valorPrice = getDecimal()
// const valorThumb = `Foto ${getAleatorio()}`

// const objeto = {
//     id: valorId,
//     title: valorTitle,
//     price: valorPrice,
//     thumbnail: valorThumb
// }

// const stringifyed = JSON.stringify(objeto)
// console.log(objeto)
// for(let i=0;i<1000;i++){
//     let a = getAleatorio()
//     console.log(a)
// }


