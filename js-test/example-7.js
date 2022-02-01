import { cleanConsole, createAll } from "./data";
const companies = createAll();


// Parte 1: Crear una función tomando como parámetro un "id" de "company" y
// devolviendo el nombre de esta "company".

// var idCompany = 7
// console.log(companies);
// const companyName = companies.find (item=>item.id=== idCompany )
// console.log(companyName.name);

//console.log("---- SOLUTION EXAMPLE 7 part 1 --- ", companyName);
//fin parte 1

// function CompanyName(idCompany){
// const companyName = companies.find (id => id === idCompany )
// console.log(companyName);
// }

// Parte 2: Crear una función tomando como parámetro un "id" de "company" y
// quitando la "company" de la lista.

// let newCompanies = companies.slice()
// let newCompanies2= [];  
// var idCompany = 0

// console.log(newCompanies);
// newCompanies.splice ( idCompany, 1 );
// console.log(newCompanies);

//console.log("---- SOLUTION EXAMPLE 7 part 2 --- ", newCompanies);

//fin parte 2

// Parte 3: Crear una función tomando como parámetro un "id" de "company" y
// permitiendo hacer un PATCH/PUT (como con una llamada HTTP) en todos los
// atributos de esta "company" excepto en el atributo "users".

// let newCompanies = companies.slice()
// console.log(newCompanies);
 
// var idCompany = 5
// let companyName=newCompanies.find(item => item.id === idCompany) 
// let company= {name:companyName.name,id: companyName.id,isOpen:companyName.isOpen, userLength:companyName.usersLength}
// console.log(company);

//console.log("---- SOLUTION EXAMPLE 7 part 3 --- ", company);
//fin parte 3

// Parte 4: Crear una función tomando como parámetro un "id" de "company" y un
// nuevo "user" cuyo el apelido es "Delgado", el nombre "Juan", de 35 años y
// dueño de un carro. El nuevo "user" debe agregarse a la lista de "users" de este
// "company" y tener un "id" generado automáticamente. La función también debe modificar
// el atributo "usersLength" de "company".

// let newCompanies = companies.slice()
// var idCompany = 0
// console.log(newCompanies);

// let companyName=newCompanies.find(item => item.id === idCompany) 
// var id=companyName.users.length
// let user = {firstName: 'juan', lastName: 'Delgado', age: 35, car: true, id:id}
// companyName.users.push({...user}); 
// console.log(companyName.users);

//hasta aca
// newCompanies.forEach(function (item) {
//     var newUsers = item.users
//     //console.log(newUsers);
//     newUsers.forEach(function (item2) {
//         newCompanies.push({...item2,"company":item.name});
//     })
// })


//console.log("---- SOLUTION EXAMPLE 7 part 4 --- ", companyName);
//fin parte 4

// Parte 5: Crear una función tomando como parámetro un "id" de "company" y
// permitiendo hacer un PUT (como con una llamada HTTP) en esta "company" excepto
// en el atributo "users".


//console.log("---- SOLUTION EXAMPLE 7 part 5 --- ", companies);
//fin parte 5

// Parte 6: Crear una función tomando como parámetro un "id" de "company" y un
// "id" de "user". La función debe quitar este "user" de la lista de "users"
// de "company" y cambiar el atributo "usersLength" de "company".

// let newCompanies = companies.slice()
// let newCompanies2= []; 
// var idCompany = 3
// var idUser = 6
// //console.log(newCompanies);

// let companyName=newCompanies.find(item => item.id === idCompany) 
// //console.log(companyName);
// let arrayUser = companyName.users.find (item2 => item2.id === idUser)
// console.log(arrayUser);
// companyName.users.splice ( arrayUser, 1 );
// console.log(companyName);
//hasta aqui

//var id=companyName.users.length

// for (var i=0;i<newCompanies.length;i++){
//     newCompanies2.push()
// }

// newCompanies.forEach(function (item) {
//     var newUsers = item.users
//     //console.log(newUsers);
//     newUsers.forEach(function (item2) {
//         newCompanies2.push({...item2,"company":item.name});
//     })
// })


//console.log("---- SOLUTION EXAMPLE 7 part 6 --- ", companyName);
//fin parte 6

// Parte 7: Crear una función tomando como parámetro un "id" de "company" y un
// "id" de "user" que permite hacer un PATCH (como con una llamada HTTP) en este
// "user".

// let newCompanies = companies.slice()

// var idCompany = 3
// var idUser = 6
// //console.log(newCompanies);

// let companyName=newCompanies.find(item => item.id === idCompany) 
// //console.log(companyName);
// let arrayUser = companyName.users.find (item2 => item2.id === idUser)
// console.log(arrayUser);



//console.log("---- SOLUTION EXAMPLE 7 part 7 --- ", arrayUser);
//fin parte 7

// Parte 8: Crear una función tomando como parámetro un "id" de "company" y un
// "id" de "user" que permite hacer un PUT (como con una llamada HTTP) en este
// "user".

// let newCompanies = companies.slice()

// var idCompany = 3
// var idUser = 6
// //console.log(newCompanies);

// let companyName=newCompanies.find(item => item.id === idCompany) 
// //console.log(companyName);
// let arrayUser = companyName.users.find (item2 => item2.id === idUser)
// console.log(arrayUser);


//console.log("---- SOLUTION EXAMPLE 7 part 8 --- ", arrayUser);
//fin parte 8

// Parte 9: Crear una función tomando como parámetro dos "id" de "company" y
// un "id" de "user". La función debe permitir que el user sea transferido de la
// primera "company" a la segunda "company". El atributo "usersLength" de cada
// "company" debe actualizarse.

let newCompanies = companies.slice()
var idCompanyDelete = 3
var idCompanyNew = 5
var idUser = 6
//console.log(newCompanies);

let companyNameDelete=newCompanies.find(item => item.id === idCompanyDelete)
//console.log(companyNameDelete); 
let companyNameNew=newCompanies.find(item => item.id === idCompanyNew) 
console.log(companyNameNew);
let arrayUser = companyNameDelete.users.find (item2 => item2.id === idUser)
console.log(arrayUser.firstName);
companyNameDelete.users.splice ( arrayUser, 1 );
//console.log(companyName);

 var id=companyNameNew.users.length
 let user = {firstName: arrayUser.firstName, lastName: arrayUser.lastName, age: arrayUser.age, car: arrayUser.car, id:id}
 console.log(user);
 //
 companyNameNew.users.push({...user}); 
 console.log(companyNameNew);


//console.log("---- SOLUTION EXAMPLE 7 part 9 --- ", companyNameNew);
//fin parte 9
//cleanConsole(7, companies);


// -----------------------------------------------------------------------------
// INSTRUCCIONES EN ESPAÑOL













// -----------------------------------------------------------------------------
// INSTRUCTIONS IN ENGLISH

// Part 1: Create a function taking as parameter an "id" of "company" and
// returning the name of this "company".

// Part 2: Create a function taking as parameter an "id" of "company" and
// removing the "company" from the list.

// Part 3: Create a function taking as a parameter an "id" of "company" and
// allowing to make a PATCH (as with an HTTP call) on all
// attributes of this "company" except on the "users" attribute.

// Part 4: Create a function taking as parameter an "id" of "company" and a
// new "user" whose name is "Delgado", the first name "Juan", aged 35 and
// a car. The new "user" must be added to the "users" list of this
// "company" and have an automatically generated "id". The function must also modify
// the "usersLength" attribute of "company".

// Part 5: Create a function taking as parameter an "id" of "company" and
// allowing to make a PUT (as with an HTTP call) on this "company" except
// on the "users" attribute.

// Part 6: Create a function taking as a parameter an "id" of "company" and a
// "id" of "user". The function must remove this "user" from the list of "users"
// from "company" and change the attribute "usersLength" from "company".

// Part 7: Create a function taking as a parameter an "id" of "company" and a
// "id" of "user" allowing to make a PATCH (as with an HTTP call) on this
// "user".

// Part 8: Create a function taking as a parameter an "id" of "company" and a
// "id" of "user" allowing to make a PUT (as with an HTTP call) on this
// "user".

// Part 9: Create a function taking as parameter two "id" of "company" and
// an "id" of "user". The function must allow the user to be transferred as a parameter
// from the 1st "company" to the 2nd "company". The "usersLength" attribute of each
// "company" must be updated
