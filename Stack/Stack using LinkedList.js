class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

class Stack {
  constructor() {
    this.top = null;
    this.length = 0;
  }

  // Push element onto stack
  push(element) { // top = 2, element = 3, 3.next = 2 top = 3
    const newNode = new Node(element);
    newNode.next = this.top;
    this.top = newNode;
    this.length++;
  }

  // Pop element from stack
  pop() {
    if (this.isEmpty()) {
      return "Stack is empty";
    }
    const poppedValue = this.top.value;
    this.top = this.top.next;
    this.length--;
    return poppedValue;
  }

  // Peek at the top element
  peek() {
    if (this.isEmpty()) {
      return "Stack is empty";
    }
    return this.top.value;
  }

  // Check if stack is empty
  isEmpty() {
    return this.length === 0;
  }

  // Get stack size
  size() {
    return this.length;
  }

  // Print stack elements
  print() {
    let current = this.top;
    let result = [];
    while (current) {
      result.push(current.value);
      current = current.next;
    }
    console.log(result.join(" -> "));
  }
}

// Example usage:
const myStack = new Stack();
myStack.push(10);
myStack.push(20);
myStack.push(30);
console.log(myStack.peek()); // 30
console.log(myStack.pop());  // 30
console.log(myStack.size()); // 2
myStack.print(); // 20 -> 10
