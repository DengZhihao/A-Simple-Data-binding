防抖和节流
----
### 防抖
防抖简单来说就是要等触发完事件一段时间内不再触发事件，之后执行。比如在验证登录名是否重复时就可以使用防抖。
我们先看一下大概的使用场景:
```js
var count = 1;
var container = document.getElementById('container');

function getUserAction() {
    container.innerHTML = count++;
};

container.onmousemove = debounce(getUserAction,1000);
```
可以看到我们要用防抖函数包裹触发事件并设置时间，得到两个信息，一是要通过定时器来控制时间每次触发都刷新这个定时器的计时，二是要用一个函数来作为返回值。
```js
function debounce1(func, time){ //基本版
	var timeout;
	return function (){
		clearTimeout(timeout);
		timeout = setTimeout(func, time);
	}
}
```
但是这段代码出现的问题是this指向是Window对象，而不是调用者。通过apply修复：
```js
function debounce2(func, time){ //修复this问题
	var timeout;
	return function (){
		var context = this;
		clearTimeout(timeout);
		timeout = setTimeout(
			function(){
				func.apply(context);
			}, time
		)
	}
}
```
JavaScript 在事件处理函数中会提供事件对象 event，以参数形式传入，而我们现在的代码是没办法捕获到参数的。
```js
function debounce3(func, time){ //修复事件对象问题
	var timeout;
	return function (){
		var context = this;
		var args = arguments;
		clearTimeout(timeout);
		timeout = setTimeout(
			function(){
				func.apply(context,args);
			}, time
		)
	}
}
```
```js
function debounce(func, time, immediate){
	var timeout, result;
	return function(){
		var context = this;
		var args = arguments;
		
		if(timeout) clearTimeout(timeout);
		if(immediate){
			var now = !timeout;
			timeout = setTimeout(function(){
				timeout = null;
			},time)
			if(now) result = func.apply(context, args);
		} else{
			timeout = setTimeout(function(){
				func.apply(context, args)
			},time)
		}
		return result;
	}
}
```
### 节流
节流的原理很简单：如果你持续触发事件，每隔一段时间，只执行一次事件。比如图片懒加载。
```js
function throttle(func,time){
    var timeout;
    return function (){
        if(!timeout){
            timeout = setTimeout(
                function(){
                    timeout = null;
                    func();
                },time
            )
        }
    }
}
```
类似防抖的，修复this和参数问题：
```js
function throttle(func,time){
	var timeout;
	
	return function(){
		var context = this;
		var args = argumetns;
		if(!timeout){
			timeout = setTimeout(
				function(){
					timeout = null;
					func.apply(context, arguments);
				},time
			)
		}
	}
}
```