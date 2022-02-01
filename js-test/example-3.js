import { cleanConsole, createAll } from "./data";
const companies = createAll();

cleanConsole(3, companies);

let newCompanies = companies.slice()

//recorremos el arreglo
newCompanies.forEach(function (item) {
    //primer check para guardar los true
    var check1 = item.name.charAt(0) === item.name.charAt(0).toUpperCase()
    if (check1 === true) {                
        var newUsers = item.users
        newUsers.forEach(function (item2) {
            //segundo check para guardar los nombres en true
            var check2 = (  item2.firstName !== undefined && item2.firstName.charAt(0) === item2.firstName.charAt(0).toUpperCase())
            //console.log(check2);
            if(check2===true && check1 == true ){
                //tercer check para guardar los apellidos en true
                var check3 = (item2.lastName !== undefined && item2.lastName.charAt(0) === item2.lastName.charAt(0).toUpperCase() )
                if(check3=== true && check2===true && check1 == true){
                    console.log(check3);
                    //return check3
                   // return true
                }            
             }
        })
    }
})

console.log("---- SOLUTION EXAMPLE 3 --- ", companies);

// -----------------------------------------------------------------------------
// INSTRUCCIONES EN ESPAÑOL

// Cree una función tomando la variable "companies" como parámetro y devolviendo
// un booleano que valida que todos los nombres de las empresas y los atributos
// "firstName" y "lastName" de "users" están en mayúsculas.
// Debes probar la operación de esta función importando la función creada
// en el "example-1.js".

// -----------------------------------------------------------------------------
// INSTRUCTIONS IN ENGLISH

// Create a function taking the "companies" variable as a parameter and returning
// a boolean validating that all the names of the companies and the attributes "firstName"
// and "lastName" of "users" are capitalized. You must test the operation
// of this function by importing the function created for "example-1.js"
