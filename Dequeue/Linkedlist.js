// https://www.geeksforgeeks.org/implementation-deque-using-doubly-linked-list/

class Node {
    constructor(data) {
        this.data = data;
        this.prev = null;
        this.next = null;
    }
}

class Deque {
    constructor() {
        this.front = null;
        this.rear = null;
        this.size = 0;
    }

    isEmpty() {
        return this.front === null;
    }

    getSize() {
        return this.size;
    }

    insertFront(data) {
        const newNode = new Node(data);
        if (this.isEmpty()) {
            this.front = this.rear = newNode;
        } else {
            newNode.next = this.front;
            this.front.prev = newNode;
            this.front = newNode;
        }
        this.size++;
    }

    insertRear(data) {
        const newNode = new Node(data);
        if (this.isEmpty()) {
            this.front = this.rear = newNode;
        } else {
            newNode.prev = this.rear;
            this.rear.next = newNode;
            this.rear = newNode;
        }
        this.size++;
    }

    deleteFront() {
        if (this.isEmpty()) console.log("UnderFlow");
        else {
            const temp = this.front;
            this.front = this.front.next;
            if (this.front) this.front.prev = null;
            else this.rear = null;
            this.size--;
        }
    }

    deleteRear() {
        if (this.isEmpty()) console.log("UnderFlow");
        else {
            this.rear = this.rear.prev;
            if (this.rear) this.rear.next = null;
            else this.front = null;
            this.size--;
        }
    }

    getFront() {
        return this.isEmpty() ? -1 : this.front.data;
    }

    getRear() {
        return this.isEmpty() ? -1 : this.rear.data;
    }

    clear() {
        while (!this.isEmpty()) this.deleteFront();
    }
}

// Driver code
const dq = new Deque();
dq.insertRear(5);
dq.insertRear(10);
console.log("Rear:", dq.getRear());
dq.deleteRear();
console.log("New Rear:", dq.getRear());

dq.insertFront(15);
console.log("Front:", dq.getFront());
console.log("Size:", dq.getSize());

dq.deleteFront();
console.log("New Front:", dq.getFront());