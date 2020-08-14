发布订阅模式
----
场景：事件委托
```js
const eventEmmiter = {}

eventEmmiter.list = {}

eventEmmiter.on = function(event,fn) {
  (this.list[event] || (this.list[event] = [])).push(fn);
}

eventEmmiter.emit = function(event, ...args) {
    let _this = this;
    this.list[event].forEach(fn => fn.apply(_this, args))
}
```
