import { createAll, cleanConsole } from "./data";

const companies = createAll();

cleanConsole(1, companies);

let newCompanies = companies

//recorremos el arreglo
newCompanies.forEach(function (item) {
    //reemplazamos las minusculas por mayusculas
    const stringCompanies = item.name;
    var strCompanies = stringCompanies.charAt(0).toUpperCase() + stringCompanies.slice(1)
    item.name=strCompanies

    var newUsers = item.users
    //reemplazamos los indefined por ""
    newUsers.forEach(function (item2) {
        if (item2.firstName === undefined) {
            item2.firstName = "";
        }
        if (item2.lastName === undefined) {
            item2.lastName = "";
        }
        //reemplazamos las minusculas por mayusculas
        const string = item2.firstName;
        var str = string.charAt(0).toUpperCase() + string.slice(1)
        item2.firstName=str
        const string2 = item2.lastName;
        var str2 = string2.charAt(0).toUpperCase() + string2.slice(1)
        item2.lastName=str2
        //ordenamos el arreglo de users, por apellido y nombre
        newUsers.sort((a, b) => {
            if (a.firstName < b.firstName) {
                return -1
            } else if (a.firstName > b.firstName) {
                return 1
            } else {
                return 0
            }
        })
        newUsers.sort((a, b) => {
            if (a.lastName < b.lastName) {
                return -1
            } else if (a.lastName > b.lastName) {
                return 1
            } else {
                return 0
            }
        })


    })
});

//ordenamos las companies en orden decreciente por numero de usuarios
newCompanies.sort((a, b) => {
    if (a.usersLength > b.usersLength) {
        return -1
    } else if (a.usersLength < b.usersLength) {
        return 1
    } else {
        return 0
    }
});

//funcion para contar que todos los datos esten en mayusculas

newCompanies.forEach(function (item) {
    var check1 = item.name.charAt(0) === item.name.charAt(0).toUpperCase()
    if (check1 === true) {
        //console.log(check1);        
        var newUsers = item.users
        newUsers.forEach(function (item2) {
            //para eliminar el error de undefined
            if (item2.firstName === undefined) {
                item2.firstName = "";
            }
            if (item2.lastName === undefined) {
                item2.lastName = "";
            }
            var check2 = (item2.firstName.charAt(0) === item2.firstName.charAt(0).toUpperCase() && item2.firstName !=="")
            //console.log(check2);
            if(check2===true  ){
                var check3 = (item2.lastName.charAt(0) === item2.lastName.charAt(0).toUpperCase() && item2.lastName !== "")
                if(check3=== true ){
                    console.log(check3);
                   // return true
                }            
             }
        })
    }
})

//console.log(newCompanies);

console.log("----SOLUTION EXAMPLE 1 --- ", companies);



// -----------------------------------------------------------------------------
// INSTRUCCIONES EN ESPAÑOL

// Crear una función tomando la variable "companies" como parámetro y reemplazando
// todos los valores "undefined" en "usuarios" por un string vacío.
// El nombre de cada "company" debe tener una letra mayúscula al principio, así como
// el apellido y el nombre de cada "user".
// Las "companies" deben ordenarse por su total de "user" (orden decreciente)
// y los "users" de cada "company" deben aparecer en orden alfabético.

// -----------------------------------------------------------------------------
// INSTRUCTIONS IN ENGLISH

// Create a function taking the variable "companies" as a parameter and replacing
// all values "undefined" in "users" by an empty string.
// The name of each "company" must have a capital letter at the beginning as well as
// the last name and first name of each "user".
// The "companies" must be sorted by their number of "user" (decreasing order)
// and the "users" of each "company" must be listed in alphabetical order
