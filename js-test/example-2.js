import { cleanConsole, createAll } from "./data";
const companies = createAll();

cleanConsole(2, companies);

const hasCar = true
var finalCompanies=[]
var newCompanies=companies.slice()

console.log(newCompanies);

//recorremos el arreglo
for (var i=0;i<newCompanies.length;i++){
    for (var j=0; j < newCompanies[i].usersLength;j++){        
        if (newCompanies[i].users[j].car === hasCar){

            //guardamos solamente los que estan en true
            finalCompanies.push(newCompanies[i].users[j])
            
        }        
    }
}


console.log(finalCompanies);

console.log("---- SOLUTION EXAMPLE 2 --- ", companies);

// -----------------------------------------------------------------------------
// INSTRUCCIONES EN ESPAÑOL

// Crear una función tomando como parámetro la variable "companies" y el
// booleano "hasCar". Para cada "company" debe conservar solo
// "users" cuyo valor de atributo "car" es igual al parámetro del
// función "hasCar" y el atributo "usersLength" deben indicar el total de
// "users" correspondientes al parámetro "hasCar".

// -----------------------------------------------------------------------------
// INSTRUCTIONS IN ENGLISH

// Create a function taking as parameter the variable "companies" and the
// boolean "hasCar". For each "company" you must keep only the
// "users" whose attribute value "car" is equal to the parameter of the
// "hasCar" function and the "usersLength" attribute must indicate the number of
// "users" corresponding to the "hasCar" parameter
