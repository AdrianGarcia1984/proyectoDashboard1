import { cleanConsole, createAll } from "./data";
const companies = createAll();


cleanConsole(5, companies);

let newCompanies = companies.slice()
var finalCompanies=[]
let result = []
let size=0
let average=0
let hasCar=true
let averageWithCar=0

//sacando el hascar
for (var i=0;i<newCompanies.length;i++){
    for (var j=0; j < newCompanies[i].usersLength;j++){        
        if (newCompanies[i].users[j].car === hasCar){

            //guardamos solamente los que estan en true
            finalCompanies.push(newCompanies[i].users[j])
            
            averageWithCar=averageWithCar+newCompanies[i].users[j].age
        }        
    }
}
averageWithCar=(averageWithCar/finalCompanies.length)
//console.log(finalCompanies);

companies.forEach(function (item) {  
    var newUsers = item.users
    newUsers.forEach(function (item2) { 
        //console.log(item2.age);
        newCompanies.push({...item2,"company":item.name});  
        average=average+item2.age     
    })
    //console.log(newCompanies); 
})
average = (average/newCompanies.length)
result.push({"size":newCompanies.length,'average':average, 'hasCar':finalCompanies.length,'averageWithCar':averageWithCar })   
console.log(result);


console.log("---- SOLUTION EXAMPLE 5 --- ", result);
// -----------------------------------------------------------------------------
// INSTRUCCIONES EN ESPAÑOL

// Use la función creada en el ejemplo 4 para crear una nueva función tomando
// como parámetro la variable "companies" y devuelve un nuevo objeto con los
// siguientes atributos:
//     'size' => total de "users"
//     'average' => edad promedio de "users"
//     'hasCar' => total de "users" propietarios de un carro
//     'averageWithCar' => edad promedio de los "users" con un carro

// -----------------------------------------------------------------------------
// INSTRUCTIONS IN ENGLISH

// Use the function created in example 4 to create a
// new function taking as parameter the "companies" variable and returning
// a new object with the following attributes:
//     'size' => number of "users"
//     'average' => average age of "users"
//     'hasCar' => number of "users" owning a car
//     'averageWithCar' => average age of users with a car.
