###防抖和节流
```js
function debounce1(func,time){ //基本版
	var timeout;
	return function (){
		clearTimeout(timeout);
		timeout = setTimeout(func, time);
	}
}

function debounce2(func,time){ //修复this问题
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

function debounce3(func,time){ //修复鼠标事件问题
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

function debounce(func,time，immediate){
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