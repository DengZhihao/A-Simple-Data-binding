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
