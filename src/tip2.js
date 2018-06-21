
function test1(a, b, c){
    b = b || 100;
    c = c || "OK"
}

function test2(a, b=100, c="OK"){
    console.log(a, b, c)
}

//test2(1)

//test2(1, 2, "NO")


function test3(a, b){
    'use strict'
    console.log(a===arguments[0])
    console.log(b===arguments[1])
    a = 3;
    b = 4;
    console.log(a===arguments[0])
    console.log(b===arguments[1])
}

function test4(a, b = 5){
    console.log(arguments.length)
    console.log(a===arguments[0])
    console.log(b===arguments[1])
    a = 3;
    b = 4;
    console.log(a===arguments[0])
    console.log(b===arguments[1])
}

//test3(1,2)
test4(1)
//test4(1,2)
