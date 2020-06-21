### 数组扁平化
数组扁平化就是把一个多维数组转化为一个一维数组，假设有个flatten函数的话，效果如下：
```js
var arr = [1, [2, [3, 4]]];
console.log(flatten(arr)) // [1, 2, 3, 4]
```
### 递归
首先我们可以想到的方法就是递归，通过判断类型决定是否结束递归。
```js
var arr = [1, [2, [3, 4]]];

function flatten(arr){
    var res =[];
    for(var i = 0;i < arr.length;i++){
        if(Array.isArray(arr[i])){
            res = res.concat(flatten(arr[i]));
        }else{
            res.push(arr[i]);
        }
    }
    return res;
}

console.log(flatten(arr)) // [1, 2, 3, 4]
```
### reduce
我们也可以用reduce来减少代码量。
```js
var arr = [1, [2, [3, 4]]];

function flatten(arr){
    return arr.reduce(function(acc,val) {
        return acc.concat(Array.isArray(val) ? flatten(val) : val)
    },);
}

console.log(flatten(arr)) // [1, 2, 3, 4]
```

### underscore
我们来看看underscore是怎么完成flatten函数的,其中的shallow参数控制扁平化全部还是一层，strict控制是否过滤非数组元素
```js
var arr = [1, [2, [3, 4]]];

function flatten(input, shallow, strict, output = []){
    var idx = output.length;
    for (var i = 0, len = input.length;i < len.length;i++){
        value = input[i];
        if(Array.isArray(value)){
            if (shallow){
                var j = 0;
                while(j < value.length){
                    output[idx++] = value[j++];
                }
            }else {
                flatten(input, shallow, strict, output);
                idx = output.length;
            }   
        }else if(!strict){
            output[idx++] = value;
        }   
    }
    return output;
}

console.log(flatten(arr)) // [1, 2, 3, 4]
```
设置 shallow 和 strict 各种值对应的结果：

1. shallow true + strict false ：正常扁平一层
2. shallow false + strict false ：正常扁平所有层
3. shallow true + strict true ：扁平一层并去掉非数组元素
4. shallow false + strict true ： 返回一个[]

其中underscore的一些方法调用了flatten函数，我们看看有哪些：
### _.flatten
```js
_.flatten = function(array, shallow) {
    flatten(array, shallow, false);
}
```
正常的扁平中我们不需要去掉非数组函数。
### _.union
union接受多个数组并返回数组的并集，其中传入非数组元素会被跳过。我们可以先扁平化所有数组然后去重。并用strict参数忽略非数组元素。
```js
_.union = function() {
    return unique(flatten(arguments, true, true));
}
```
### _.difference
_.difference的语法为_.difference(array, *others)。效果是取出来自 array 数组，并且不存在于多个 other 数组的元素。
<br>实现方法也很简单，扁平 others 的数组，筛选出 array 中不在扁平化数组中的值：
```js
function difference(array, ...others) {
    others = flatten(others, true, true)
    return array.filter(function(item) {
        return others.indexOf(item) === -1;
    })
}
```