import pkg from "normalizr";
import utils from "util";

const { denormalize, normalize, schema } = pkg;

const test = {
  email: "1000@coder",
  nombre: "Coderhouse",
  apellido: "test",
  mensaje:"holaaaaaaaa"
}

console.log("/* -------------- ORIGINAL ------------- */");
console.log("length", JSON.stringify(test).length);

const email = new schema.Entity("email");
const nombre = new schema.Entity("nombre");
const apellido = new schema.Entity("apellido");
const mensaje = new schema.Entity("mensaje");


const registro = new schema.Entity("registro", {
  email: email,
  nombre: nombre,
  apellido: apellido,
  mensaje: mensaje
});

const normalizedData = normalize(test, registro);
console.log("/* -------------- NORMALIZED ------------- */");
console.log(utils.inspect(normalizedData, false, 4, true));
console.log("length", JSON.stringify(normalizedData).length);

const denormalizedData = denormalize(
  normalizedData.result,
  registro,
  normalizedData.entities
);

console.log("/* -------------- DENORMALIZED ------------- */");
console.log(utils.inspect(denormalizedData, false, 4, true));
console.log("length", JSON.stringify(denormalizedData).length);