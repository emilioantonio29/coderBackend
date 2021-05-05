/*
Creamos un proyecto de Node.js con npm init -y
Instalamos el TSC mediante npm: npm i typescript
Creamos un archivo index.ts con contenido en Typescript
Transpilamos con el comando: node_modules/.bin/tsc .\index.ts -w
Verificamos que en nuestra carpeta de proyecto se encuentre index.js

RUN:
    npm run transpile


Transpile Server:

REQUIRE:
    const server = require('http')
    const Server = http.Server
    const Server = new Server(app)
    const Socket = require('socket.io')
    const io = new Socket(server)
    -----------------------------------
    import {Server as HttpServer } from 'http'
    const server = new HttpServer(app)
    import Socket from 'socket.io'
    const io = new Socket(server)

FLAGS:
    https://www.typescriptlang.org/docs/handbook/compiler-options.html
    --noEmitOnError: Disable emitting files if any type checking errors are reported.
*/
var i = 10;
var i2 = 11;
function printN(n) {
    console.log(n);
}
printN(40);
printN(i);
printN(i2);
// /---------------------------------------------/
var getNum = function () { return Math.floor(Math.random() * 256); };
var Color = /** @class */ (function () {
    function Color() {
    }
    Color.prototype.getRandom = function () {
        return "rgb(" + getNum() + "," + getNum() + "," + getNum() + ")";
    };
    return Color;
}());
var color = new Color();
console.log(color.getRandom());
