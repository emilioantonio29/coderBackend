"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var getNum = function getNum() {
    return Math.floor(Math.random() * 256);
};

var Color = function () {
    function Color() {
        _classCallCheck(this, Color);
    }

    _createClass(Color, [{
        key: "getRandom",
        value: function getRandom() {
            return "rgb(" + getNum() + "," + getNum() + "," + getNum() + ")";
        }
    }]);

    return Color;
}();

var color = new Color();
console.log(color.getRandom());
/*
Agregar propiedad conv
- el -w sirve para que si se modifica el js en vivo, se transpilen las modificaciones
- el -o sirve para indicar el nombre del archivo de salida
npm run conv
{
    "name": "14.-",
    "version": "1.0.0",
    "description": "",
    "main": "index.js",
    "scripts": {
      "conv": "babel color.js -o color.js5.js -w", ////////////////////////////// 
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
