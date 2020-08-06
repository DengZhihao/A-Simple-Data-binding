常见排序
----
### 快速排序
```js
var quickSort = function(arr) {

　　if (arr.length <= 1) { return arr; }

　　var pivot = arr.pop();

　　var left = [];

　　var right = [];

　　for (var i = 0; i < arr.length; i++){

　　　　if (arr[i] < pivot) {

　　　　　　left.push(arr[i]);

　　　　} else {

　　　　　　right.push(arr[i]);

　　　　}

　　}

　　return quickSort(left).concat([pivot], quickSort(right));

};
```