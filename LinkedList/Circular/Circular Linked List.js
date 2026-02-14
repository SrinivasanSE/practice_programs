// https://www.geeksforgeeks.org/circular-linked-list/

class Node {
  constructor(data, next = null) {
    this.data = data;
    this.next = next;
  }
}

class CircularLinkedList {
  constructor() {
    this.tail = null;
  }

  prepend(data) {
    const node = new Node(data);
    if (!this.tail) {
      node.next = node;
      this.tail = node;
      return;
    }
    node.next = this.tail.next;
    this.tail.next = node;
  }

  append(data) {
    if (!this.tail) {
      this.prepend(data);
      return;
    }
    const node = new Node(data);
    node.next = this.tail.next;
    this.tail.next = node;
    this.tail = node;
  }

  insertAt(data, index) {
    if (index < 0) {
      return;
    }

    if (index === 0) {
      this.prepend(data);
      return;
    }

    let i = 0;
    let curr = this.tail.next;
    while (i < index - 1 && curr) {
      i++;
      curr = curr.next;
      if (curr === this.tail.next) {
        throw new Error("index greater than length");
      }
    }

    const node = new Node(data);
    node.next = curr.next;
    curr.next = node;
    if (curr === this.tail) {
      this.tail = node;
    }
  }

  getAt(index) {
    if (!this.tail) {
      throw new Error("No elements in list");
    }
    let curr = this.tail.next;
    let i = 0;
    while (i < index && curr) {
      i++;
      curr = curr.next;
      if (curr == this.tail.next) {
        throw new Error("Index is greater than the length");
      }
    }

    return curr.data;
  }

  indexOf(data) {
    if (!this.tail) {
      return;
    }
    let curr = this.tail.next;
    let i = 0;
    while (curr) {
      if (curr.data === data) {
        return i;
      }
      curr = curr.next;
      i++;
      if (curr === this.tail.next) {
        break;
      }
    }

    return -1;
  }

  print() {
    let str = "";
    if (this.tail) {
      let curr = this.tail.next;
      while (true) {
        str += curr.data + "->";
        curr = curr.next;
        if (curr === this.tail.next) {
          break;
        }
      }
    }
    if (!str) {
      str = "(empty)";
    }
    console.log(str);
  }

  shift() {
    if (!this.tail) {
      throw new Error("No elements found");
    }
    if (this.tail.next === this.tail) {
      this.tail = null;
      return;
    }

    const head = this.tail.next;
    this.tail.next = head.next;
  }

  pop() {
    if (!this.tail) {
      throw new Error("No elements found");
    }

    if (this.tail.next === this.tail) {
      this.tail = null;
      return;
    }

    let curr = this.tail.next;
    while (curr.next !== this.tail) {
      curr = curr.next;
    }
    //console.log(curr)
    curr.next = this.tail.next;
    this.tail = curr;
  }

  removeAt(index) {
    if (!this.tail) {
      throw new Error("No elements found");
    }

    if (index === 0) {
      this.shift();
      return;
    }

    let i = 0;
    let curr = this.tail.next;
    while (i < index - 1 && curr.next) {
      i++;
      curr = curr.next;
      if (curr.next === this.tail.next) {
        throw new Error("Index greater than list length");
      }
    }

    curr.next = curr.next.next;
  }

  remove(data) {
    if (!this.tail) {
      throw new Error("No elements found");
    }
    let curr = this.tail.next;
    if (curr.data === data) {
      this.shift();
      return;
    }
    let i = 0;
    while (curr.next) {
      if (curr.next === this.tail.next) {
        throw new Error("Element not found in the list");
      }
      if (curr.next.data === data) {
        curr.next = curr.next.next;
        return;
      }
      curr = curr.next;
    }
  }
}

const cl = new CircularLinkedList();
//cl.print()

//console.log(this.tail)
cl.prepend(10);
//console.log(this.tail)

cl.prepend(20);
cl.prepend(30);
cl.prepend(40);
cl.append(50);
cl.append(60);
cl.insertAt(100, 5);
cl.print();
//cl.prepend(120)
//cl.shift()
//cl.pop()
//cl.removeAt(5)
cl.remove(50);
cl.print();
//console.log(cl.getAt(5))
//console.log(cl.indexOf(90))
