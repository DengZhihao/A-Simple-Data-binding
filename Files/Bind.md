### 模拟bind方法
```js
// The difference between call() and bind() is that the call() sets the this keyword and
// executes the function immediately and it does not create a new copy of the function,
// while the bind() creates a copy of that function and sets the this keyword.

Function.prototype.bind = Function.prototype.bind || function (context) {
    if(typeof this !== "function"){
    	throw new Error("Function.prototype.bind - what is trying to be bound is not callable");
    }
	var self = this;
	var args = Array.prototype.slice.call(arguments, 1);
	
	var fA = function () {
	}
	
	var fB = function () {
		return self.apply(this instanceof fB ? this : context, args.concat(Array.prototype.slice.call(arguments)))
	}
	
	fA.prototype = this.prototype;
	fB.prototype = new fA();
	
	return fB;
};
```