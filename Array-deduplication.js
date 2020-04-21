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

var res = arr.filter((index, item, array) => array.indexOf(item) === index) //ES5

function deduplication(arr){
	var obj={};
	var res = arr.filter((index, item, array) => object.hasOwnProperty(typeof item + JSON.stringify(item)) ? false : (obj[typeof item + JSON.stringify(item)] = true)) //Object
}

var res = (arr) => [...new Set(arr)] //ES6
