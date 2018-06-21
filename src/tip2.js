/**
 * ES5模拟实现默认参数
 */
function test1(a, b, c){
    b = b || 100;
    c = c || "OK"
}

// 但是||符合左边为undefined null 0 ""都会继续返回右边的值
function test11(){
    let a = undefined || 1
    let b = null || 2
    let c = 0 || 3
    let d = "" || "4"
    console.log(a, b, c, d)
}

test11()

/**
 * ES6默认参数
 */
function test2(a, b=100, c="OK"){
    console.log(a, b, c)
}

test2(1)
test2(1,0)
test2(1,null)
test2(1,undefined)
test2(1, undefined, undefined)
test2(1, undefined, "")

/**
 * arguments参数
 */
function test3(a, b){
    'use strict'
    console.log(a===arguments[0])
    console.log(b===arguments[1])
    a = 3;
    b = 4;
    console.log(a===arguments[0])
    console.log(b===arguments[1])
}

/**
 * 默认参数对arguments参数的影响
 */
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
test4(1,2)
