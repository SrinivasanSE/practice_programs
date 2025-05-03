// https://www.geeksforgeeks.org/implementation-deque-using-circular-array/


class Dequeue {
    constructor (c) {
        this.arr = new Array(c)
        this.capacity = c
        this.size = 0
        this.front = 0
    }
    
    insertFront(val) {
        if (this.size === this.capacity) {
            return
        }
        this.front = (this.front - 1 + this.capacity) % this.capacity
        this.arr[this.front] = val
        this.size++
    }
    
    deleteFront() {
        if (this.size === 0) {
            return null
        }
        const val = this.arr[this.front]
        this.front = (this.front + 1) % this.capacity
        this.size--
        return val
    }
    
    getFront() {
        if (this.size === 0) {
            return null
        }
        
        return this.arr[this.front]
    }
    
    insertRear(val) {
         if (this.size === this.capacity) {
            return
        }
        const rear = (this.front + this.size) % this.capacity
        this.arr[rear] = val
        this.size++
    }
    
    deleteRear(val) {
        if (this.size === 0) {
            return null
        }
        
        const rear = (this.front + this.size - 1) % this.capacity
        this.size--
        return this.arr[rear]
    }
    
    getRear() {
        if (this.size === 0) {
            return null
        }
        const rear = (this.front + this.size - 1) % this.capacity
        return this.arr[rear]
    }
    
    print() {
        console.log(this.arr)
    }
}

const d = new Dequeue(5)
d.insertFront(2)
d.insertFront(3)
console.log(d.getFront())
d.print()
console.log(d.deleteFront(), 'front')
console.log(d.getFront())
d.insertRear(4)
d.insertRear(5)
d.print()
console.log(d.getRear())
console.log(d.deleteRear())
d.insertRear(10)
d.print()

