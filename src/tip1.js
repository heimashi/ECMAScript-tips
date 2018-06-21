/**
 * var 声明的变量会当成在当前作用域顶部声明的变量
 */

//console.log(0, t) //抛出错误 ReferenceError: t is not defined
function testVar(flag){
    console.log(1, t)
    if(flag){
        var t = "A var" //用var声明变量t
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
//testVar(false)


function testlet(flag){
    console.log(1, t) //抛出错误 ReferenceError: t is not defined
    if(flag){
        let t = "A var";
        console.log(2, t) //let声明变量
    }else {
        console.log(3, t) //抛出错误 ReferenceError: t is not defined
    }
    console.log(4, t) //抛出错误 ReferenceError: t is not defined
}  

//testlet(true)

/**
 * var声明的变量可以重复定义，后面的会覆盖前面的， let声明不允许重复
 */
function testDefineTwice(){
    var a = "1";
    var a = 2;
    console.log(a)

    let a = 3; //SyntaxError: Identifier 'a' has already been declared
    let b = 1;
    let b = 2; //SyntaxError: Identifier 'b' has already been declared

    const c = 3;
    let c = 3; //SyntaxError: Identifier 'c' has already been declared

    let d = 3; 
    const d = 3;//SyntaxError: Identifier 'd' has already been declared
}

//testDefineTwice();

/**
 * 此种情况let声明会在作用域内覆盖之前的变量
 */
function testDefineTwice2(condition){
    var a = "1";
    if(condition){
        let a = 2;
        console.log(1, a)
    }
    console.log(2, a)
}

//testDefineTwice2(true);


/**
 * 在浏览器环境下，console中执行下面的代码，var变量的作用域会被提高到window对象的属性
 */
var aa = "aa";
let bb = "bb";
const cc = "cc";
console.log(this.aa, this.bb, this.cc)
console.log(window.aa)