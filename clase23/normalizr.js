import pkg from "normalizr";
import utils from "util";

const { denormalize, normalize, schema } = pkg;

// const originalData = {
//   id: "123",
//   author: {
//     id: "1",
//     name: "Paul",
//   },
//   title: "My awesome blog post",
//   comments: [
//     {
//       id: "324",
//       commenter: {
//         id: "2",
//         name: "Nicole",
//       },
//     },
//   ],
// };

const originalData = {
  author: {
    id: "emilio@hotmail",
    firstname: "Paul",
    lastname: "martinez"
  },
  comments: 
    {
      id: "1",
      commenter: "esto es una prueba"
    },
};

console.log("/* -------------- ORIGINAL ------------- */");
console.log(utils.inspect(originalData, false, 4, true));
console.log("length", JSON.stringify(originalData).length);

// Define your comments schema
const author = new schema.Entity("authors");

const Comemnt = new schema.Entity("comments")

// Define your article
const article = new schema.Entity("articles", {
  author: author,
  comments: Comemnt,
});

const normalizedData = normalize(originalData, article);
console.log("/* -------------- NORMALIZED ------------- */");
console.log(utils.inspect(normalizedData, false, 4, true));
console.log("length", JSON.stringify(normalizedData).length);

const denormalizedData = denormalize(
  normalizedData.result,
  article,
  normalizedData.entities
);

console.log("/* -------------- DENORMALIZED ------------- */");
console.log(utils.inspect(denormalizedData, false, 4, true));
console.log("length", JSON.stringify(denormalizedData).length);