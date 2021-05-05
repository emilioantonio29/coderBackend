const getNum = () => Math.floor(Math.random()*256)

class Color{
    getRandom(){
        return `rgb(${getNum()},${getNum()},${getNum()})`
    }
}
const color = new Color()
console.log(color.getRandom())
/*
- Agregar propiedad conv en el package.json; Agregar archivo.babelrc
    el -w sirve para que si se modifica el js en vivo, se transpilen las modificaciones
    el -o sirve para indicar el nombre del archivo transpilado
- RUN:
    npm run conv
    node_modules/.bin/babel .\origen.js -o .\destino.js -w

{
    "name": "14.-",
    "version": "1.0.0",
    "description": "",
    "main": "index.js",
    "scripts": {
      "conv": "babel color.js -o color.js5.js -w", ////////////////////////////// el -w sirve para que si se modifica el js en vivo, se transpilen las modificaciones
      "test": "echo \"Error: no test specified\" && exit 1"
    },
    "author": "",
    "license": "ISC",
    "dependencies": {
      "babel-cli": "^6.26.0",
      "babel-preset-env": "^1.7.0"
    }
  }
  */