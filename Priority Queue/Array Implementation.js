// https://www.geeksforgeeks.org/priority-queue-using-array/?ref=next_article

// Ascending queue
class PriorityQueue {
    constructor() {
        this.items = []
    }
    
    enqueue(data) {
        if (this.items.length === 0) {
            this.items.push(data)
        } else {
                    let added = false
            for(let i = 0; i < this.items.length; i++) {
                if (data.priority < this.items[i].priority || (data.priority === this.items[i].priority && data.data > this.items[i].priority)) { // use > for descending queue
                    this.items.splice(i, 0, data)
                    added = true
                    break
                }
            }
            if(!added) {
            this.items.push(data)
        }
        }
        

    }
    
    peek() {
        return this.items.length > 0 ? this.items[0] : null
    }
    
    dequeue() {
        return this.items.shift()
    }
}

const pq = new PriorityQueue()
pq.enqueue({priority: 1, data: 3})
pq.enqueue({priority: 2, data: 4})
pq.enqueue({priority: 3, data: 43})
pq.enqueue({priority: 4, data: 5})
console.log(pq.peek())
console.log(pq.dequeue())
pq.enqueue({priority: 3, data: 99})
console.log(pq.items)