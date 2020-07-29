JS栈和队列
----
#### 用数组实现栈和队列
使用数组原生方法即可，较简单不赘述了
```js

```
#### 不用数组实现栈和队列
也挺简单，用对象实现
```js
class stack {
    constructor() {
        this.size = 0;
        this.storage = {};
    }
    
    push(item) {
        this.storage[this.size] = item;
        this.size++;
    }

    pop(item) {if(
        this.isEmpty()){
            return undefined
        }
        this.size--;
        const result = this.storage[this.count];
        delete this.storage[this.count];
        return result;
    }

    //栈是否为空
    isEmpty() {
        return this.count===0
    }
    
    peek() {
        if(this.isEmpty()){
            return undefined
        }
        return this.storage[this.count];
    }
}
```