### 模拟Vue的数据绑定
```XML
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Data-binding</title>
</head>
<body>
<div id="app">
		<input type="text" v-model="text">{{ text }}
</div>

<script>
		function nodeToFragment (node, vm) {
			var flag = document.createDocumentFragment();
			var child;
			
			while (child = node.firstChild) {
				compile(child, vm);
				flag.append(child); 
			}
			return flag;
		}
		function compile (node, vm) {
			var reg = /\{\{(.*)\}\}/;
			if (node.nodeType === 1) {
				var attr = node.attributes;
				for (var i = 0; i < attr.length; i++) {
					if (attr[i].nodeName == 'v-model') {
						var name = attr[i].nodeValue; 
						node.addEventListener('input', function (e) {
							vm[name] = e.target.value;
						});
						node.value = vm[name]; 
						node.removeAttribute('v-model');
					}
				};
			}
			if (node.nodeType === 3) {
				if (reg.test(node.nodeValue)) {
					var name = RegExp.$1;
					name = name.trim();
					new Watcher(vm, node, name,'text');		
				}
			}
		}
		function defineReactive(obj,key,val){
			var dep=new Dep();
			Object.defineProperty(obj,key,{
				get:function(){
					if(Dep.target) dep.addSub(Dep.target);
					return val;
				},
				set:function(newVal){
					if(newVal==val) return;
					val=newVal;
					dep.notify();
				}
			})
		}
		function observe(obj, vm){
           		Object.keys(obj).forEach(function(key){
               			defineReactive(vm, key, obj[key]);
           		})
       		}
		function Watcher (vm, node, name, nodeType) {
			Dep.target = this;
			this.name = name;
			this.node = node;
			this.vm = vm;
			this.nodeType = nodeType;
			this.update();
			Dep.target = null;
		}
		Watcher.prototype = {
			update: function () {
				this.get();
				if (this.nodeType == 'text') {
					this.node.nodeValue = this.value;
				}
				if (this.nodeType == 'input') {
					this.node.value = this.value;
				}
			},
			// 获取data中的属性值
			get: function () {
				this.value = this.vm[this.name]; // 触发相应属性的get
			}
		}
		function Dep () {
			this.subs = []
		}
		Dep.prototype = {
			addSub: function(sub) {
				this.subs.push(sub);
			},
			notify: function() {
				this.subs.forEach(function(sub) {
					sub.update();
				});
			}
		};
		function Vue (options) {
			this.data = options.data;
			var data = this.data;
			observe(data, this);
			var id = options.el;
			var dom = nodeToFragment(document.getElementById(id), this);
			document.getElementById(id).appendChild(dom); 
		}
		var vm = new Vue({
			el: 'app',
			data: {
				text: 'hello world'
			}
		});
</script>
</body>
</html>
```