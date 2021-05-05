//import {sumar,restar,multiplicar,dividir} from './lib/operaciones'
import * as operaciones from './lib/operaciones'

const mensaje: string = 'hola'

console.log(mensaje)

const num1:number=10;
const num2:number=4;

// console.log(sumar(num1,num2));
// console.log(restar(num1,num2));
// console.log(.multiplicar(num1,num2));
// console.log(dividir(num1,num2));

console.log(operaciones.sumar(num1,num2));
console.log(operaciones.restar(num1,num2));
console.log(operaciones.multiplicar(num1,num2));
console.log(operaciones.dividir(num1,num2));


/*
dist: es el objeto generado que es el que vamos a publicar.
src: directorio fuente en el que vamos a trabajar

RUN:
    npm run build

crear tsconfig:
    agregarlo a los scripts del package.json:     "init": "tsc --init",
    correrlo con la ruta completa: ./node_modules/.bin/tsc --init
*/ 