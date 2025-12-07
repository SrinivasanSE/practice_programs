// https://www.geeksforgeeks.org/implement-stack-using-queue/

// Using two queues

// Operation in Push

var MyStack = function () {
    this.q1 = []
    this.q2 = []
};


MyStack.prototype.push = function (x) {
    this.q2.push(x)
    while (this.q1.length > 0) { // move all the elements from q1 to q2, so that the latest pushed element is at the 0th index and all the other elements are at the back
        this.q2.push(this.q1[0])
        this.q1.shift()
    }

    [this.q1, this.q2] = [this.q2, this.q1] // swap, so that q1 contains all the elements and q2 will be empty

};


MyStack.prototype.pop = function () {
    if (this.q1.length === 0) return -1
    return this.q1.shift()
};


MyStack.prototype.top = function () {
    return this.q1.length === 0 ? -1 : this.q1[0]
};


MyStack.prototype.empty = function () {
    return this.q1.length === 0
};

// Operation in Pop

class myStack {
    constructor() {
        this.q1 = [];
        this.q2 = [];
    }

    // insert element
    push(x) {
        this.q1.push(x);
    }

    // remove top element
    pop() {
        if (this.q1.length === 0)
            return;

        while (this.q1.length !== 1) {
            this.q2.push(this.q1.shift());
        }
        this.q1.shift();
        [this.q1, this.q2] = [this.q2, this.q1];
    }

    // return top element
    top() {
        if (this.q1.length === 0)
            return -1;

        while (this.q1.length !== 1) {
            this.q2.push(this.q1.shift());
        }
        let temp = this.q1.shift();
        this.q2.push(temp);
        [this.q1, this.q2] = [this.q2, this.q1];
        return temp;
    }

    // return current size
    size() {
        return this.q1.length;
    }
}





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


MyStack.prototype.push = function(x) {
    const size = this.q.length()
    this.q.enqueue(x) // x= 5, q = [1, 2, 3, 4, 5]
    for(let i = 0; i < size; i++) { // except the last added element, we move everything to the back
        this.q.enqueue(this.q.top()) // [1, 2, 3, 4, 5, 1] - 1 from the front added to at the back
        this.q.dequeue() // 1 is removed now
    }
    // at the end, it will become [5, 1, 2, 3, 4], 5 is in the front, which is the latest element we pushed
};


MyStack.prototype.pop = function() {
    const data = this.q.top()
    this.q.dequeue()
    return data
};


MyStack.prototype.top = function() {
    return this.q.top()
};


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