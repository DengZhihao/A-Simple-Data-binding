###数组去重
最经典的也是兼容性最好的办法那一定是用两个for循环嵌套。
```js
function deduplication(arr){
	var res = [];
	for(var i = 0;i < arr.length;i++){
		for(var j = 0;j < res.length;j++){
			if(arr[i] === res[j]){
				break;
			}
		}
		if(j === res.length){
		   res.push(arr[i]);
		}
	}
	return res;
} //Regular
```
ES5提供了filter方法，利用indexOf()通过index就可以快速识别去重。
```js
var res = arr.filter((index, item, array) => array.indexOf(item) === index) //ES5

function deduplication(arr){
	var obj={};
	var res = arr.filter((index, item, array) => object.hasOwnProperty(typeof item + JSON.stringify(item)) ? false : (obj[typeof item + JSON.stringify(item)] = true)) //Object
}
```
到了ES6就更简单了，一行代码就可以完成。ES6新增了Set对象，利用Set对象没有重复值的特点把数组转变为Set对象就可以方便去重。
```js
var res = (arr) => [...new Set(arr)] //ES6
```