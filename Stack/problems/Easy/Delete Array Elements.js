// https://www.geeksforgeeks.org/delete-array-elements-which-are-smaller-than-next-or-become-smaller/


class Node {
    constructor(data, next) {
        this.data = data
        this.next = next
    }
}
class Stack {
    constructor() {
        this.head = null
    }
    
    push(num) {
        const node = new Node(num, this.head)
        this.head = node
    }
    
    pop() {
        if(!this.head) {
            return
        }
        const ele = this.head.data
        this.head = this.head.next
        
        return ele
    }
    
    peek() {
        if(this.head)
           return this.head.data
    }
    
    isEmpty() {
        return this.head == null
    }
}


class Solution {
    deleteElement(arr, k) {
        // write the code
        const s = new Stack()
        const res = []
        let count = 0
        for(let i = 0; i < arr.length; i++) {
            
            while(!s.isEmpty() && s.peek() < arr[i] && count < k) {
                s.pop()
                count++
            }
            
            s.push(arr[i])
        }
        
        while(!s.isEmpty()) {
            res.push(s.peek()) // we could use res[m--] to push the elements from the end and return it, reverse not needed then, m will be length of the stack
            s.pop()
        }
        
        return res.reverse()
        
    }
}