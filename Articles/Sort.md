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
### 归并排序
```js
function mergeSort(arr){
    if(arr.length < 2){
        return arr;
    }
    let mid = Math.floor(arr.length / 2);
    return merge(mergeSort(arr.slice(0,mid)),mergeSort(arr.slice(mid)));
}

function merge(a, b){
    let res =[];
    let i = 0;
    let j = 0;

    while(i < a.length && j < b.length){
        if(a[i] > b[j]){
            res.push(b[j++]);
        }else {
            res.push(a[i++]);
        }
    }

    while(i < a.length){
        res.push(a[i++])
    }

    while(j < b.length){
        res.push(b[j++])
    }
    return res;
}
```