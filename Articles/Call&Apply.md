模拟call/apply
----
call() 方法在使用一个指定的 this 值和若干个指定的参数值的前提下调用某个函数或方法。

我们要做的就是三件事，第一先把用context.fn获取当前函数，第二步执行并保存结果，第三步删除这个方法，返回结果。
```js
Function.prototype.call2=function(context){
	var context = context || window;
	context.fn = this;
  
	var args = [];
	for(var i = 1;i < arguments.length;i++){
		args.push('arguments[' + i + ']');
	} 
	var result = eval('context.fn(' + args + ')');
  
	delete context.fn;
	return result;
} // ES3写法
```
ES6通过rest省去了处理arguments和eval：
```js
Function.prototype.call3 = function (context,...args) {
    var obj = context || window;
    obj.fn = this;

    var result = obj.fn(args);

    delete obj.fn
    return result;
} // ES6写法
```
apply为：
```js
Function.prototype.apply2 = function (context, arr) {
    var context = Object(context) || window;
    context.fn = this;

    var result;
    if (!arr) {
        result = context.fn();
    }
    else {
        var args = [];
        for (var i = 0, len = arr.length; i < len; i++) {
            args.push('arr[' + i + ']');
        }
        result = eval('context.fn(' + args + ')')
    }

    delete context.fn
    return result;
}
```