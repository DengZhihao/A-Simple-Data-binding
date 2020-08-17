### 模拟new()方法实现
根据MDN解释,new 关键字会进行如下的操作：
1. 创建一个空的简单JavaScript对象（即{}）；
2. 链接该对象（即设置该对象的构造函数）到另一个对象 ；
3. 将步骤1新创建的对象作为this的上下文 ；
4. 如果该函数没有返回对象，则返回this。
```js
function newObj () {
	var obj = new Object();  // 创建新对象
	
	var constructor = [].shift.call(arguments); // 分割出构造函数
	
	obj._proto_ = constructor.prototype; // 将obj的原型指向构造函数，这样obj就可以访问到构造函数原型中的属性
	
	var res = constructor.apply(obj, arguments); //改变构造函数的this到obj上，这样obj就可以访问到构造函数本身的属性
	
	return typeof res === 'Object' ? res : obj; // 判断如果返回对象只需返回res即可
}
```
