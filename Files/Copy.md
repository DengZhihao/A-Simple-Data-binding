### 浅拷贝
浅拷贝就是简单的复制每条属性但是只会拷贝引用所以会带来问题。
```js
var shallowCopy = function(obj){
	if(typeof obj !== 'object') return;
	var newObj = obj instanceof Array ? [] : {};
	for(var i in obj){
		if(obj.hasOwnPrototype(i)){
			newObj[i] = obj[i];
		}
	}
	return newObj;
}
```
### 深拷贝
做深拷贝的话需要我们在拷贝的时候判断一下属性值的类型，如果是对象就递归调用深拷贝函数。
```js
var deepCopy = function(obj){
	if(typeof obj !== 'object') return obj;
	var newObj = obj instanceof Array ? [] : {};
	for(var i in obj){
		if(obj.hasOwnPrototype(i)){
			newObj[i] = typeof newObj[i] === 'object' ? deepCopy(obj[i]) : obj[i];
		}
	}
	return newObj;
}
```
### 完整的深拷贝
简单写出深拷贝之后我们要考虑的是object实际包含了不同的类型，需要分情况处理。
```js
var perfectCopy = function(obj) {
    if(typeof obj !== 'object') return obj;
    let cloneObj = {};
    switch(obj.constructor){
        case Array:
          cloneObj = [];
        case Object:
          for(var property in obj){
            cloneObj[property] = typeof obj[property] === 'object'?clone(obj[property]):obj[property];
          }
          break;
        case Map:
          cloneObj = new Map();
          obj.forEach((value,key)=>{
            cloneObj.set(key,typeof value==='object'?clone(value):value);
          });
          break;
        case Set:
          cloneObj = new Set();
          obj.forEach(value=>{
            cloneObj.add(typeof value==='object'?clone(value):value);
          });
          break;
        case Date:
           cloneObj = new Date(obj.valueOf()) 
           break;
        case RegExp:
            cloneObj = new RegExp(initalObj.valueOf());
      }
    return cloneObj;
}
```
