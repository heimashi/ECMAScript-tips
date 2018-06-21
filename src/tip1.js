/**
 * var 声明的变量会当成在当前作用域顶部声明的变量
 */

//console.log(0, t) // 抛出错误 ReferenceError: t is not defined
function testVar(flag){
    console.log(1, t)
    if(flag){
        var t = "A var"
        console.log(2, t)
    }else {
        console.log(3, t)
    }
    console.log(4, t)
}

/* 
返回的结果:
1 undefined
2 'A var'
4 'A var'
 */
//testVar(true)

/* 
返回的结果:
1 undefined
3 undefined
4 undefined
 */
testVar(false)