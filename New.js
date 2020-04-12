function newObj () {
	var obj = new Object();
	
	var constructor = [].shift.call(arguments);
	
	obj._proto_ = constructor.prototype;
	
	var res = constructor.apply(obj, arguments);
	
	return typeof res === 'Object' ? res : obj;
}
 
