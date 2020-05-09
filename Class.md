```
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
