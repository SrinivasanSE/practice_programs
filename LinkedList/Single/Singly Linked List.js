// https://www.geeksforgeeks.org/singly-linked-list-tutorial/

class Node {
    constructor(data, next = null) {
        this.data = data
        this.next = next
    }
}

class LinkedList {
    constructor() {
        this.head = null
        this.size = 0
    }
    
    append(data) { // O(n)
        if (!this.head) {
            this.prepend(data)
            return
        }
        const node = new Node(data)
        let curr = this.head
        while(curr.next) {
            curr = curr.next
        }
        curr.next = node
        this.size += 1
    }
    
    prepend(data) { // O(1)
        const node = new Node(data, this.head)
        this.size += 1
        this.head = node
    }
    
    insertAt(data, index) { // O(n)
        if (index < 0) {
            throw new Error("Invalid index")
        }
        const node = new Node(data)
        if (index === 0) {
            this.prepend(data)
            return
        }
        let i = 0
        let curr = this.head
        
        while(i < index - 1 && curr) {
            curr = curr.next
            i+=1
        }
        
        if(!curr) {
            throw new Error("Index is greater than the length of the linked list")
        }
        node.next = curr.next
        curr.next = node
        this.size += 1
    }

    // https://www.geeksforgeeks.org/insert-a-node-after-a-given-node-in-linked-list/
    insertAfter(data, key) {
        if(!this.head) {
            throw new Error("No nodes found")
        }
        let curr = this.head
        while(curr) {
            if(curr.data === key) {
                break
            }
            curr = curr.next
        }
        
        if(!curr) {
            throw new Error("Node not found")
        }
        
        const node = new Node(data)
        node.next = curr.next
        curr.next = node
        this.size += 1
        return -1
    }

    // https://www.geeksforgeeks.org/insert-a-node-in-linked-list-before-a-given-node/
    insertBefore(data, key) {
        if(!this.head) {
            throw new Error("no nodes found")
        }
        const node = new Node(data)
        if(this.head.data === key) {
            node.next = this.head
            this.head = node
            return
        }
        
        let curr = this.head
        while(curr.next) {
            if(curr.next.data === key) {
                break
            }
            curr = curr.next
        }
        
        if(!curr.next) {
            throw new Error("Node not found")
        }
        
        node.next = curr.next
        curr.next = node
        
    }
    
    getAt(index) { // O(n)
        if (index < 0) {
            throw new Error("Invalid index")
        }
        
        let curr = this.head
        let i = 0
        while (i < index && curr) {
            curr = curr.next
            i+=1
        }
        
        if(!curr) {
            throw new Error("Index is greater than the length of the linked list")
        }
        
        return curr.data
    }
    
    indexOf(data) { //O(n)
        let curr = this.head
        let i = 0
        while(curr) {
            if (curr.data === data) {
                return i
            }
            i++
            curr = curr.next
        }
        
        return -1
    }
    
    shift() { // O(1)
        if(!this.head) {
            throw new Error("Cannot remove from empty linked list")
        }
        const res = this.head.data
        this.head = this.head.next
        this.size -=1
        return res
    }
    
    pop() { // O(n)
        if(!this.head) {
            throw new Error("Cannot remove from empty linked list")
        }
        
        let res
        
        if(!this.head.next) {
            res = this.head.data
            this.head = null
            return res
        }
        
        let secondLastNode = this.head
        while(secondLastNode.next.next != null) {
            secondLastNode = secondLastNode.next
        }
        res = secondLastNode.next.data
        secondLastNode.next = null
        this.size--
        return res
    }
    
    removeAt(index) { // O(n)
        /*
        let curr = head
        if (x === 1) {
            head = head.next
            return head
        }
        let i = 1
        let prev = null
        while(i < x && curr) {
            prev = curr
            curr = curr.next
            i++
        } 
        //console.log(curr)
        prev.next = curr.next
        return head
        */
        
        if (index < 0) {
            throw new Error("Invalid index")
        }
        if (index === 0) {
            this.shift()
            return
        }
        
        let i = 0
        let curr = this.head
        while(i < index - 1 && curr.next) {
            curr = curr.next
            i+=1
        }
        if(!curr.next) {
            throw new Error("Index not found")
        }
        curr.next = curr.next.next
        this.size--
        
    }
    
    remove(data) { // O(n)
        if(!this.head) {
            throw new Error("Cannot remove from empty linked list")
        }
        let curr = this.head
        if(curr.data === data) {
            this.shift()
            return
        }
        
        while(curr.next) {
            if(curr.next.data === data) {
                curr.next = curr.next.next
                this.size--
                return
            }
            curr = curr.next
        } 
        
        throw new Error("Element not found")
    }
    
    length() { // O(n)
        let count = 0
        
        let curr = this.head
        
        while(curr) {
            curr = curr.next
            count += 1
        }
        
        return count
    }
    
    print() { // O(n)
        let curr = this.head
        let str = ""
        while(curr) {
            str += "->" + curr.data
            curr= curr.next
        }
        if(!str) {
            str = "(empty)"
        }
        
        console.log(str)
    }
    
}

const ll = new LinkedList()
ll.append(10)
ll.append(30)
ll.prepend(20)
ll.insertAt(50, 1)
//ll.print()
//console.log(ll.getAt(3))
//console.log(ll.indexOf(0))
//console.log(ll.shift())
//console.log(ll.pop())
ll.print()
//ll.removeAt(3)
//ll.remove(10)
ll.print()
console.log(ll.size, ll.length())
