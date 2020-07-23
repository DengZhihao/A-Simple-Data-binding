### Class
ES6的class写法总的来说更像是一种语法糖，他做到的ES5也都可以做到。只是这种写法让面向对象的写法更加清晰了。

Constructor
----
```js
class Person { //ES6标准class
    constructor(name) {
        this.name = name;
    }

    sayHello() {
        return 'hello, I am ' + this.name;
    }
}

var kevin = new Person('Kevin');
kevin.sayHello(); // hello, I am Kevin

function Person (name) { //ES5写法
	this.name = name;
}
Person.prototype.sayHello = function () {
	return 'hello, I am ' + this.name;
}
var kevin = new Person('Kevin');
kevin.sayHello(); // hello, I am Kevin
```
我们可以看到 ES5 的构造函数 Person，对应 ES6 的 Person 类的 constructor 方法。

值得注意的是：类的内部所有定义的方法，都是不可枚举的（non-enumerable）

以上面的例子为例，在 ES6 中：
```js
Object.keys(Person.prototype); // []
Object.getOwnPropertyNames(Person.prototype); // ["constructor", "sayHello"]
```
然而在 ES5 中：
```js
Object.keys(Person.prototype); // ['sayHello']
Object.getOwnPropertyNames(Person.prototype); // ["constructor", "sayHello"]
```
实例属性
----
以前，我们定义实例属性，只能写在类的 constructor 方法里面。比如：
```js
class Person {
    constructor() {
        this.state = {
            count: 0
        };
    }
}
```
然而现在有一个提案，对实例属性和静态属性都规定了新的写法，而且 Babel 已经支持。现在我们可以写成：
```js
class Person {
    state = {
        count: 0
    };
}
```
对应到 ES5 都是：
```js
function Person() {
    this.state = {
        count: 0
    };
}
```
