ES6的class写法总的来说更像是一种语法糖，他做到的ES5也都可以做到。只是这种写法让面向对象的写法更加清晰了。

####Constructor
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
