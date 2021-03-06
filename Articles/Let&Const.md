# let/const
### 函数作用域 vs 跨级作用域

我们先来了解两个概念。

函数作用域：创建函数后在花括号中声明的一些语句或变量只在函数内部起作用。

块级作用域：与函数作用域对应的就是在当前块中起作用，javaScript的块级就是{...}大括号内的代码块以及函数内部。

举个栗子：
```js
function  add(a, b) {
    var  c= a + b;
    return  c;
}
if(1){
    var d = 'block';
}
console.log(add(1,3));
console.log(c);  //  ReferenceError: sum is not defined
console.log(d);  //  'block'发现是可以访问到的
```
### let / const

为了加强对变量生命周期的控制，ECMAScript 6 引入了块级声明。块级声明用于声明在指定块的作用域之外无法访问的变量。let 和 const 都是块级声明的一种。

他们有如下特点：

1.仅声明在块级内部

2.重复声明报错

3.不绑定全局作用域

再来说下 let 和 const 的区别：

const实际上保证的是变量指向的那个内存地址不得改动。对于简单类型的数据（数值、字符串、布尔值），值就保存在变量指向的那个内存地址，因此等同于常量。但对于复合类型的数据（主要是对象和数组），变量指向的内存地址，保存的只是一个指针，const只能保证这个指针是固定的，至于它指向的数据结构是不是可变的，就完全不能控制了。这意味着当用 const 声明对象或数组时其中的值是可更改的。

### babel如何编译他们的

const和let现在一律转换成var。那const到底如何保证不变呢？其实就是你修改const常量的值，babel编译会直接报错。

转换前
```js
var a = 1;
let b = 2;
const c = 3;
```
转换后：
```js
var a = 1;
var b = 2;
var c = 3;
```
那let的块级作用怎么体现呢？来看看下面例子，实质就是在块级作用改变一下变量名，使之与外层不同。

转换前：
```js
let a1 = 1;
let a2 = 6;

{
    let a1 = 2;
    let a2 = 5;

    {
        let a1 = 4;
        let a2 = 5;
    }
}
a1 = 3;
```

转换后：
```js
var a1 = 1;
var a2 = 6;

{
    var _a = 2;
    var _a2 = 5;

    {
        var _a3 = 4;
        var _a4 = 5;
    }
}
a1 = 3;
```