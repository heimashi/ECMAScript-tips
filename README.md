# ES6-tips

总结 ECMAScript 6 的知识小点tip



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
**var声明的变量可以重复定义，后面的会覆盖前面的， let/const声明不允许重复**
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

    let d = 3; 
    const d = 3;//SyntaxError: Identifier 'd' has already been declared
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
在浏览器环境下，console中执行下面的代码，var变量的作用域会被提高到window对象的属性
```JavaScript
var aa = "aa";
let bb = "bb";
const cc = "cc";
console.log(this.aa, this.bb, this.cc)
console.log(window.aa) 
```


### Tip2- 函数


### Tip3- this
详见案例代码[tip3.js](https://github.com/heimashi/ES6-tips/blob/master/src/tip3.js)
**this是在函数被调用时发生的绑定，它指向什么完全取决于函数在哪里被调用**

this 的四种绑定规则
在 JavaScript 中，影响 this 指向的绑定规则有四种：
- 默认绑定
- 隐式绑定
- 显式绑定
- new绑定


##### **默认绑定**
最直接的一种方式，不加任何的修饰符直接调用函数，如在浏览器中执行下面的代码：
```JavaScript
function testThis0() {
    console.log(this === window)
    console.log(this.tmp)
    console.log(this.tmp2)
}
var tmp = 1;  //var变量声明会提升到全局对象window中
let tmp2 = 2;  //let不会提升
testThis0(); 
```
浏览器环境中，函数直接调用的this为全局对象，即window对象，可以通过this访问到外部定义的tmp变量。

Nodejs环境中，函数直接调用的this为全局对象，即global对象；函数外的this是Node文件的exports对象
```JavaScript
function testThis1() {
    console.log(this === exports)
    console.log(this === global);
}
console.log(this === exports)
console.log(this === global);
testThis1();
```
在node环境中执行上面的代码，testThis1函数内的this对象为调用的global全局对象，而外部的this对象为node模块的exports对象。

##### **隐式绑定**
通过对象去调用函数，调用位置存在“上下文对象”
```JavaScript
function testThis3() {
    console.log(this.t);
}
let obj1 = {
    t: 't',
    testThis3,
}
obj1.testThis3();
```

##### **显式绑定**
使用 Function.prototype 中的三个方法 call(), apply(), bind()显示绑定对象。三个函数，都可以改变函数的 this 指向到指定的对象。
不同之处在于，call() 和 apply() 是立即执行函数，并且接受的参数的形式不同：
    call(this, arg1, arg2, ...)
    apply(this, [arg1, arg2, ...])
而 bind() 则是创建一个新的包装函数，并且返回，而不是立刻执行。
    bind(this, arg1, arg2, ...)
```JavaScript
function testThis4() {
    console.log(this.t4);  // 输出 1
    test4.apply({t4: 2}, arguments);// 输出 7
    test4.call({t4: 2}, ...arguments)// 输出 7
    let f = test4.bind({t4: 2}, ...arguments)
    f();
}
function test4(b) {
    console.log(this.t4 + b);
}
//global.t4 = 1;//nodejs
var t4 = 1;//浏览器
testThis4(5);
```

##### **new绑定**
new操作符会创建一个全新的对象，这个新对象会被执行 [[Prototype]] 连接，这个新对象会绑定到函数调用的 this。如果函数没有返回其他对象，那么 new 表达式中的函数调用会自动返回这个新对象。
```JavaScript
function testThis5(t5){
    this.t5 = t5;
}
let m = new testThis5(66)
console.log(m)
```



#### 绑定的优先级
绑定的优先级：**new绑定 > 显式绑定 > 隐式绑定 > 默认绑定**， 见下面的代码：
```JavaScript
function testThis6(t) {
    this.aa = t
    console.log(this.aa);
}
let obj3 = {testThis6}
testThis6(1); 
obj3.testThis6(2);     // 隐式绑定 > 默认绑定
console.log(obj3)
let ff = obj3.testThis6.bind(obj3);      // 显式绑定 > 隐式绑定
ff(3)
console.log(obj3)
let obj4 = new ff(4) // new绑定 > 显式绑定
console.log(obj3, obj4)
```



#### ES6箭头函数 
箭头函数不会绑定this，箭头函数内部的this指向为外层第一个非箭头函数对象
