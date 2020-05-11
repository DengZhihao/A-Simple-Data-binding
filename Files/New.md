```js
function newObj () {
	var obj = new Object();  // 创建新对象
	
	var constructor = [].shift.call(arguments); // 分割出构造函数
	
	obj._proto_ = constructor.prototype; // 将obj的原型指向构造函数，这样obj就可以访问到构造函数原型中的属性
	
	var res = constructor.apply(obj, arguments); //改变构造函数的this到obj上，这样obj就可以访问到构造函数本身的属性
	
	return typeof res === 'Object' ? res : obj; // 判断如果返回对象只需返回res即可
}
```
