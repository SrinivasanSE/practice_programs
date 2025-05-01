// https://www.geeksforgeeks.org/priority-queue-using-linked-list/

class Node {
    constructor(data, p) {
        this.data = data
        this.p = p
        this.next = null
    }
}

class PriorityQueue {
    constructor() {
        this.head = null
    }
    
    insert(data, p) {
        const node = new Node(data, p)
        if(this.head === null || this.head.p > p ) {
            node.next = this.head
            this.head = node
        } else {
            let start = this.head
            while (start.next != null && (start.next.p < p || (start.next.p === p && start.next.data > data ))) {
                start = start.next
            }
            
            node.next = start.next
            start.next = node
        }
    }
    
    peek() {
        return this.head.data
    }
    
    pop() {
        if (!this.head) return null
        const data = this.head.data
        this.head = this.head.next
        
        return data
    }
    
    print() {
        let res = []
        let curr = this.head
        while (curr) {
            res.push(`${curr.data} - ${curr.p}`)
            curr = curr.next
        }
        
        return res.join(" -> ")
    }
}

const pq = new PriorityQueue()

pq.insert(10, 5)
console.log(pq.peek())
pq.insert(2, 0)
pq.insert(5, 2)
pq.insert(3, 1)
pq.insert(7, 2)
console.log(pq.peek())
console.log(pq.print())