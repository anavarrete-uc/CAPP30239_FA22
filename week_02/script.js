let num = 100; //integer

//integer

/*
this is a 
block comment
*/

function foo(){
    console.log(num);
    let num1 = 200;
};

foo();

let anonFun = function(){
    console.log("hello");
}

let foo = () => console.log(num);

let arr = ["foo", "bar", 123, ["zar","car"]];

let newArr = ["cow", "turtle","goat"];

for (let item of arr) {
    console.log(item);
}

// Objects

let obj1 = {
    name: "jill", 
    age: 85, 
    job: "Cactus Hunter",
}

// Access property
console.log(obj1.name)
console.log(obj1["name"])

//Set value
obj1.job = "Barista"


//Regular for loop 
for (let i = 0; i < 10; i++);

let val = 80;

if (val > 80){
    console.log("good")
} else if (val > 50) {}

let newVar = 