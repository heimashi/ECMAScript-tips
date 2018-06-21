# ES6-tips

总结ECMAScript 6的知识小点tip



## Tip1- 变量声明 var let const

详见案例代码[tip1.js](https://github.com/heimashi/ES6_tips/blob/master/src/tip1.js)

ES5及之前一般用var来声明变量，但var声明的变量会使得其作用域被提升，例如：
```JavaScript
console.log(0, t) // 抛出错误 ReferenceError: t is not defined
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
```
- 0处的会直接抛出错误 ReferenceError: t is not defined
- 1处会得到undefined
- 2处如果flag为true会打印相应的值
- 3处会得到undefined
- 4处会得到undefined或相应的值
总之，var声明的变量会当成在当前作用域顶部声明的变量，上面的函数代码在预编译阶段JavaScript引擎会翻译为如下代码：
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