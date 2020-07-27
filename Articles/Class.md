Class
----
ES6的class写法总的来说更像是一种语法糖，他做到的ES5也都可以做到。只是这种写法让面向对象的写法更加清晰了。

### Constructor
```js
class Person { //ES6标准class
    constructor(name) {
        this.name = name;
    }

    sayHello() {
        return 'hello, I am ' + this.name;
    }
    
    static sayHi() {
        return 'hi';
    }

}
var kevin = new Person('Kevin');
kevin.sayHello(); // hello, I am Kevin
```

```js
function Person (name) { //ES5写法
	this.name = name;
}
Person.prototype.sayHello = function () {
	return 'hello, I am ' + this.name;
}

Person.sayHi = function() {
    return 'hi';
};

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
### 实例属性

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
### Babel怎么编译

我们从最简单开始，试试不加任何方法和属性的情况下，
```js
Class Person{}
```
被编译为：
```js
function _classCallCheck(instance, Constructor) {
    // 检查是否成功创建了一个对象
    if (!(instance instanceof Constructor)) {  
        throw new TypeError("Cannot call a class as a function"); 
    } 
}

var Person = function Person() {
    _classCallCheck(this, Person);
};
```
你可能会一头雾水,_classCallCheck是什么？其实很简单，它是为了保证调用的安全性。
比如我们这么调用：
```js
// ok
var p = new Person();
```

是没有问题的，但是直接调用：
```js
// Uncaught TypeError: Cannot call a class as a function
Person();
```
这是因为类必须使用 new 调用，否则会报错。这是它跟普通构造函数的一个主要区别，后者不用 new 也可以执行。Babel在这里通过instanceof判断是否存在继承关系来决定是否抛出错误。

我们这次尝试加入constructor,再来看看编译结果：
```js
class Person() {
    constructor(name) {  
        this.name = name;
        this.type = 'person';
    }
}
```
编译结果：
```js
var Person = function Person(name) {
    _classCallCheck(this, Person);
    this.type = 'person';
    this.name = name;
};
```
那最后就是添加方法：
```js
class Person {
    hello() {
        console.log('hello ' + this.name);
    }
}
```
我们尝试精简一下：
```js
var _createClass = (function () {   
    function defineProperties(target, props) { 
        // 对于每一个定义的属性props，都要完全拷贝它的descriptor,并扩展到target上
    }  
    return defineProperties(Constructor.prototype, protoProps);    
})();

var Person = (function () {
    function Person(name) { // 同之前... }

    _createClass(Person, [{
        key: 'hello',
        value: function hello() {
            console.log('hello ' + this.name);
        }
    }]);

    return Person;
})();
```
我们可以看到babel通过defineProperty方法把方法添加到了原型上。
