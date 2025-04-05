// https://www.geeksforgeeks.org/level-order-tree-traversal/


// recursion
class Solution {
    /**
     * @param {Node} node
     * @returns {number[][]}
     */
     
    levelOrderRec(node, level, res) {
        if (node === null) return
        
        if (res.length <= level) {
            res.push([])
        }
        
        res[level].push(node.data)
        this.levelOrderRec(node.left, level + 1, res)
        this.levelOrderRec(node.right, level + 1, res)
        
    }
    levelOrder(root) {
        // Your code here
        let res = []
        this.levelOrderRec(root, 0 , res)
        //console.log(res)
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

class Solution {
    /**
     * @param {Node} node
     * @returns {number[][]}
     */
    levelOrder(root) {
        // Your code here
        let res = []
        const q = new Queue()
        q.enqueue(root)
        let level = 0
        while(q.length() > 0) {
            
            let len = q.length()
            res.push([])
            
            for(let i = 0; i < len; i++) {
                const curr = q.getFront()
                res[level].push(curr.data)
                if(curr.left) q.enqueue(curr.left)
                if(curr.right) q.enqueue(curr.right)
                q.dequeue()
        }
        level++
        }
        //console.log(res)
        return res
        
    }
}