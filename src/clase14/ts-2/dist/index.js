"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
//import {sumar,restar,multiplicar,dividir} from './lib/operaciones'
var operaciones = __importStar(require("./lib/operaciones"));
var mensaje = 'hola';
console.log(mensaje);
var num1 = 10;
var num2 = 4;
// console.log(sumar(num1,num2));
// console.log(restar(num1,num2));
// console.log(.multiplicar(num1,num2));
// console.log(dividir(num1,num2));
console.log(operaciones.sumar(num1, num2));
console.log(operaciones.restar(num1, num2));
console.log(operaciones.multiplicar(num1, num2));
console.log(operaciones.dividir(num1, num2));
/*
dist: es el objeto generado que es el que vamos a publicar.
src: directorio fuente en el que vamos a trabajar

RUN:
    npm run build
*/ 
