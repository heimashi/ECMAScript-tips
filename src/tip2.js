/**
 * ES5模拟实现默认参数
 */
function test1(a, b, c){
    b = b || 100;
    c = c || "OK"
    console.log(b, c)
}

test1()

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

/**
 * 默认参数的其他用法，默认参数可以是函数，也可以是前面定义的参数
 */
function getSth(){
    return 100
}

function test5(a, b=getSth(), c=a){
    console.log(a, b, c)
}

test5(1)


/**
 * 无命名参数
 */
function test6(){
    console.log(arguments.length)
    for(let i=0; i<arguments.length; i++){
        console.log(arguments[i])
    }
}

test6(3,4,"a","b")
test6(null,5)

/**
 * 可变参数
 */
function test7(a, ...b){
    console.log(b.length)
    console.log(arguments.length)
}

test7(1,2,3)


/**
 * 展开运算符 展开数组
 */
function test8(a, ...b){
    let m = [a, ...b, "t1", "t2"]
    let n = [...arguments, ...m]
    console.log(m, n)
}

test8(1,2,3)

/**
 * 展开运算符 展开对象
 */
function test9(state){
    let newState = {
        ...state, 
        a:false,
        m:2
    }
    console.log(state, newState)
}

test9({a:true, b:3, c:"haha"})

/**
 * 展开对象的属性是浅拷贝
 */
function test10(state){
    let newState = {
        ...state, 
        a:false,
        m:2
    }
    state.b = 5
    state.c.c1=3
    console.log(state, newState)
    newState.b = 55
    newState.c.c1=33
    console.log(state, newState)
}
test10({a:true, b:2, c:{c1:2, c2:"ccc"}})