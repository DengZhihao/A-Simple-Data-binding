### 浅拷贝
```js
var shallowCopy = function(obj){
	if(typeof obj !== 'object') return;
	var newObj = obj instanceof Array ? [] : {};
	for(var i in obj){
		if(obj.hasOwnPrototype(i)){
			newObj[i] = obj[i];
		}
	}
	retuen newObj;
}
```
### 深拷贝
```js
var deepCopy = function(){
	if(typeof obj !== 'object') return;
	var newObj = obj instanceof Array ? [] : {};
	for(var i in obj){
		if(obj.hasOwnPrototype(i)){
			newObj[i] = typeof newObj[i] === 'object' ? deepCopy(obj[i]) : obj[i];
		}
	}
	retuen newObj;
}
```
