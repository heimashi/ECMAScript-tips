/**
 * 默认绑定
 * 浏览器环境中，函数直接调用的this为全局对象，即window对象；
 * 函数外的this也是指向window对象
 */
function testThis0() {
    console.log(this === window)
    console.log(this.tmp)
    console.log(this.tmp2)
}
var tmp = 1;  //var变量声明会提升到全局对象window中
let tmp2 = 2;  //let不会提升
//testThis0();



/**
 * 默认绑定
 * Nodejs环境中，函数直接调用的this为全局对象，即global对象；
 * 函数外的this是Node文件的exports对象
 */
function testThis1() {
    console.log(this === exports)
    console.log(this === global);
}

console.log(this === exports)
console.log(this === global);

//testThis1();



/**
 * 隐式绑定
 * 通过对象去调用函数
 */
function testThis3() {
    console.log(this.t);
}
let obj1 = {
    t: 't',
    testThis3,
}
//obj1.testThis3();



/**
 * 显式绑定
 * Function.prototype 中的三个方法 call(), apply(), bind()显示绑定对象
 */
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
//testThis4(5);


/**
 * new绑定
 */
function testThis5(t5){
    this.t5 = t5;
}
let m = new testThis5(66)
//console.log(m)


/**
 * 绑定优先级
 */
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

