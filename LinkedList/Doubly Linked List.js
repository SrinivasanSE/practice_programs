// https://www.geeksforgeeks.org/doubly-linked-list/

class Node {
    constructor(data, prev = null, next = null) {
        this.data = data
        this.prev = prev
        this.next = next
    }
}

class DoublyLinkedList {
    constructor() {
        this.head = null
    }
    
    forwardTraversal() {
        let curr = this.head
        let str = ""
        while(curr) {
            str += curr.data + '->'
            curr = curr.next
        }
        if(!str) {
            str = "(empty)"
        }
        console.log(str)
        return str
    }
    
    backwardTraversal(tail) {
        let curr = tail
        let str = ""
        while(curr) {
            str += curr.data + '->'
            curr = curr.prev
        }
        console.log(str)
    }
    
    length() {
        let curr = this.head
        let count = 0
        while(curr) {
            curr = curr.next
            count++
        }
        
        return count
    }
    
    prepend(data) {
        const node = new Node(data, null, this.head)
        if(this.head) { // only extra code for doubly ll
            this.head.prev = node
        }
        
        this.head = node
    }
    
    append(data) {
        if(!this.head) {
            this.prepend(data)
            return
        }
        let curr = this.head
        while(curr.next) {
            curr = curr.next
        }
        const node = new Node(data)
        node.prev = curr // only extra code for doubly dl
        curr.next = node
    }
    
    insertAt(data, index) {
        if (index < 0) {
            throw new Error("Invalid index")
        }
        if (index === 0) {
            this.prepend(data)
            return
        }
        
        let i = 0
        let curr = this.head
        while(i < index - 1 && curr) {
            curr = curr.next
            i++
        }
        if(!curr) {
            throw new Error('Index not found')
        }
        
        
        const node = new Node(data)
        node.prev = curr
        node.next = curr.next
        if(curr.next) {
        curr.next.prev = node
        }
        curr.next = node
  
    }
    
    shift() {
        if(!this.head) {
            return
        }
        
        this.head = this.head.next
        if(this.head) {
            this.head.prev = null
        }
    }
    
    pop() {
        if(!this.head) {
            return
        }
        
        if(!this.head.next) {
            this.shift()
            return
        }
        
        let secondLastNode = this.head
        while(secondLastNode.next.next != null) {
            secondLastNode = secondLastNode.next
        }
        secondLastNode.next = null
    }
    
    remove(index) {
        if (index < 0) {
            return
        }
        
        if (index === 0) {
            this.shift()
            return
        }
        let i = 0
        let curr = this.head
        while(i < index - 1 && curr.next) {
            curr = curr.next
            i++
        }
        
        if(!curr.next) {
            throw new Error("index overflow")
        }
        
        
        curr.next = curr.next.next
        if(curr.next) { // only extra code for dl 
        curr.next.prev = curr
        }
        
    }
}
    
const dl = new DoublyLinkedList()
dl.prepend(10)
dl.prepend(20)
dl.prepend(30)
dl.append(9)
dl.append(4)
dl.forwardTraversal()
//dl.insertAt(11, 3)
//dl.shift()
//dl.pop()
dl.remove(4)
dl.forwardTraversal()
    
