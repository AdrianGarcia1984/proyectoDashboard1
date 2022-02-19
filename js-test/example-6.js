import { cleanConsole, createAll } from "./data";

const companies = createAll();

let newCompanies = companies.slice()
let newCompanies2 = []

newCompanies.forEach(function (item) {   
        var newUsers = item.users
        //console.log(newUsers);
        newUsers.forEach(function (item2) {
            //var newUser = item2.join()
            console.log(item2);
            newCompanies2.join(item2.firstName, item2.lastName)
        })
    
})

console.log(newCompanies2);

cleanConsole(6, companies);

console.log("---- SOLUTION EXAMPLE 6 --- ", companies);

// -----------------------------------------------------------------------------
// INSTRUCCIONES EN ESPAÑOL

// Cree una función tomando la variable "companies" como parámetro y devolviendo
// un nuevo objeto cuyos atributos son la concatenación del apelido, nombre y
// edad de cada "user". Cada atributo debe tener el valor de boolean "car".
// Ver ejemplo a continuación.

// -----------------------------------------------------------------------------
// INSTRUCTIONS IN ENGLISH

// Create a function taking the "companies" variable as a parameter and returning
// a new object whose attributes are the concatenation of the name, first name and
// the age of each user. Each attribute must have the value of boolean "car".
// See example below

// const example = {
//   johnDoe32: true,
//   BernardoMinet45: false,
//   alinaChef23: true,
// };

// console.log(example);
