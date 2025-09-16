// https://www.geeksforgeeks.org/implement-stack-using-queue/

// refer above link for two queue approach

// using one queue

class Node {
    constructor(data, next) {
        this.data = data
        this.next = next
    }
}

class QueueL {
    constructor() {
        this.front = null
        this.rear = null
        this.size = 0
    }

    enqueue(x) {
        const node = new Node(x)
        if (this.front == null) {
            this.front = this.rear = node
            this.size++
            return
        }

        this.rear.next = node
        this.rear = this.rear.next
        this.size++
    }

    dequeue() {
        if (this.front === null) return null
        this.front = this.front.next
        if (this.front === null) {
            this.rear = null
        }
        this.size--
    }

    top() {
        if (this.front === null) return null
        return this.front.data
    }

    length() {
        return this.size
    }
}


var MyStack = function() {
    this.q = new QueueL()
};

/** 
 * @param {number} x
 * @return {void}
 */
MyStack.prototype.push = function(x) {
    const size = this.q.length()
    this.q.enqueue(x)
    for(let i = 0; i < size; i++) { // except the last added element, we move everything to the back
        this.q.enqueue(this.q.top())
        this.q.dequeue()
    }
};

/**
 * @return {number}
 */
MyStack.prototype.pop = function() {
    const data = this.q.top()
    this.q.dequeue()
    return data
};

/**
 * @return {number}
 */
MyStack.prototype.top = function() {
    return this.q.top()
};

/**
 * @return {boolean}
 */
MyStack.prototype.empty = function() {
    return this.q.length() === 0
};

/** 
 * Your MyStack object will be instantiated and called as such:
 * var obj = new MyStack()
 * obj.push(x)
 * var param_2 = obj.pop()
 * var param_3 = obj.top()
 * var param_4 = obj.empty()
 */