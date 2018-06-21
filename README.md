# ES6-tips

总结ECMAScript 6的知识小点tip



### Tip1- 变量声明 var let const

详见案例代码[tip1.js](https://github.com/heimashi/ES6-tips/blob/master/src/tip1.js)

**ES5及之前一般用var来声明变量，但var声明的变量会使得其作用域被提升**，例如：
```JavaScript
console.log(0, t) // 抛出错误 ReferenceError: t is not defined
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
```
- 0处的会直接抛出错误 ReferenceError: t is not defined
- 1处会得到undefined
- 2处如果flag为true会打印相应的值
- 3处会得到undefined
- 4处会得到undefined或相应的值

总之，**var声明的变量会当成在当前作用域顶部声明的变量**，这点有些让人匪夷所思，上面的函数代码在预编译阶段JavaScript引擎会翻译为如下代码：
```JavaScript
function testVar(flag){
    var t;
    if(flag){
        t = "A var";
        console.log(2, t)
    }else {
        console.log(3, t)
    }
    console.log(4, t)
}   
```

**ES6中引入了let和const来声明变量，不会提升作用域**，跟其他语言很相似
```JavaScript
function testlet(flag){
    console.log(1, t) //抛出错误 ReferenceError: t is not defined
    if(flag){
        let t = "A var"; //let声明变量
        console.log(2, t)
    }else {
        console.log(3, t) //抛出错误 ReferenceError: t is not defined
    }
    console.log(4, t) //抛出错误 ReferenceError: t is not defined
}    
```
**var声明的变量可以重复定义，后面的会覆盖前面的， let声明不允许重复**
```JavaScript
function testDefineTwice(){
    var a = "1";
    var a = 2;
    console.log(a)

    let a = 3; //SyntaxError: Identifier 'a' has already been declared
    let b = 1;
    let b = 2; //SyntaxError: Identifier 'b' has already been declared

    const c = 3;
    let c = 3; //SyntaxError: Identifier 'c' has already been declared
}   
```
此种情况let可以声明为跟之前的变量一样的名称，声明会在作用域内覆盖之前的变量
```JavaScript
function testDefineTwice2(condition){
    var a = "1";
    if(condition){
        let a = 2;
        console.log(1, a)
    }
    console.log(2, a)
}  
```



### Tip2- 函数