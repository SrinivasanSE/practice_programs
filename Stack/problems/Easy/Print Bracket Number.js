// https://www.geeksforgeeks.org/print-bracket-number/



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
        const ele = this.head
        this.head = this.head.next
        
        return ele
    }
    
    peek() {
        if(this.head)
           return this.head.data
    }
}

class Solution {
   bracketNumbers(str) {
       // code here
       let ans = []
       let s = new Stack()
       let count = 1
       for(let i = 0; i < str.length; i++) {
           if (str[i] === "(") {
               ans.push(count)
               s.push(count++)
           } else if (str[i] === ")" ) {
               ans.push(s.peek()) // we use stack only to keep track of closing brackets
               s.pop()
           }
       }
       //console.log(s)
       return ans
   }
}