// https://www.geeksforgeeks.org/level-order-tree-traversal/
// https://leetcode.com/problems/binary-tree-level-order-traversal/


/*

Recursion
O(n) & O(n)

*/


var levelOrder = function(root) {
    const res = []
    if (root == null) return res

    const traversal = (node, level) => {
        if (node == null) return

        if (!res[level]) { // res.length <= level
            res[level] = []
        }

        res[level].push(node.val)
        traversal(node.left, level + 1)
        traversal(node.right, level + 1)
    }

    traversal(root, 0)
    return res
    
};




/*

Iterative

O(n) & O(n)

*/

class Solution {
    levelOrder(root) {
        // Your code here
        let res = []
        const q = new Queue()
        q.enqueue(root)
        let level = 0
        while(q.length() > 0) {
            
            let len = q.length()
            res[level] = []
            
            for(let i = 0; i < len; i++) { // traverse all the nodes in the current level and push the left and right side node.
                const curr = q.getFront()
                res[level].push(curr.data)
                if(curr.left) q.enqueue(curr.left)
                if(curr.right) q.enqueue(curr.right)
                q.dequeue()
        }
        level++
        }
        return res
        
    }
}




class Node{
    constructor(data){
        this.data = data;
        this.left = null;
        this.right = null;
    }
}


class Queue {
    constructor() {
        this.front = null
        this.rear = null
        this.size = 0
    }
    
    enqueue(node) {
        this.size++
        if(this.rear == null) {
            this.front = this.rear = node
            return
        }
        this.rear.next = node
        this.rear = node
    }
    
    dequeue() {
        if(!this.front) {
            return
        }
        this.front = this.front.next
        if(!this.front) {
            this.rear = null
        }
        this.size--
    }
    
    getFront() {
        if(this.size == 0) {
            return
        }
        
        return this.front
    }
    
    length() {
        return this.size
    }
    
    
}