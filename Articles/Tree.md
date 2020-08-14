JS树相关算法
----
### 层次遍历
层次遍历一般需要借助一个队列。我们用push()和shift()方法来模拟队列，做法是首先将二叉树的根节点入队列，然后出队，访问该节点，如果它的左子树不空，则将左子树的根节点入队。如果它的右子树不为空，则将右子树的根节点入队。然后出队，对出队节点进行访问，如此反复，直到队列为空。
```js
function levelOrder(node) {
    let queue = [];
    queue.push(node);
    let result = 0;
    while(queue.length){
        node = queue.shift();
        result += node.value;
        if (node.left) {  // 如果它的右子树不为空
            queue.push(node.left);  // 将左子树的根节点入队
        }
        if (node.right) {  // 如果它的右子树不为空
            queue.push(node.right);  // 将右子树的根节点入队
        }
    }
    return result;
}
```
###反转二叉树

###求二叉树深度

```js
function maxDepth(node, depth = 0) {
    if(!node){return depth}
    return Math.max(maxDepth(node.left, depth + 1),maxDepth(node.right, depth + 1))
}
```

###反转二叉树
```js
var invertTree = function(root) {
    if(!root) return root;
    [root.left, root.right] = [invertTree(root.right), invertTree(root.left)];
    return root;
};
```