// https://leetcode.com/problems/lru-cache/description/

/*

Whenever we add or get a key, we add/move that to the front. If the capacity exceeds, we remove from the end which is the least recently used.

*/

class Node {
  constructor(key, val) {
    this.key = key;
    this.val = val;
    this.prev = null;
    this.next = null;
  }
}

class DoublyLinkedList {
  constructor() {
    this.head = new Node(-1, -1);
    this.tail = new Node(-1, -1);
    this.head.next = this.tail;
    this.tail.prev = this.head;
  }

  insertAtFront(node) {
    const next = this.head.next;
    this.head.next = node;
    node.prev = this.head;
    node.next = next;
    next.prev = node;
  }

  removeNode(node) {
    node.prev.next = node.next;
    node.next.prev = node.prev;
  }

  removeTail() {
    if (this.tail.prev === this.head) return null; // list empty
    const node = this.tail.prev;
    this.removeNode(node);
    return node;
  }
}

class LRUCache {
  constructor(capacity) {
    this.capacity = capacity;
    this.map = new Map(); // map is used to check if the key exists or not
    this.list = new DoublyLinkedList();
  }

  get(key) {
    if (!this.map.has(key)) return -1;
    const node = this.map.get(key);
    this.list.removeNode(node);
    this.list.insertAtFront(node);
    return node.val;
  }

  put(key, value) {
    if (this.map.has(key)) {
      // if the key is already present, update the value and move that to the front
      const node = this.map.get(key);
      node.val = value;
      this.list.removeNode(node);
      this.list.insertAtFront(node);
    } else {
      if (this.map.size === this.capacity) {
        // if the capacity exceeds, delete from the end
        const nodeToRemove = this.list.removeTail();
        if (nodeToRemove) this.map.delete(nodeToRemove.key);
      }
      const node = new Node(key, value);
      this.list.insertAtFront(node); // add the new node at the front
      this.map.set(key, node);
    }
  }
}

// Diff btw LRU and LFU

/*

Let's consider a constant stream of cache requests with a cache capacity of 3, see below:

A, B, C, A, A, A, A, A, A, A, A, A, A, A, B, C, D
If we just consider a Least Recently Used (LRU) cache with a HashMap + doubly linked list implementation with O(1) eviction time and O(1) load time, we would have the following elements cached while processing the caching requests as mentioned above.

[A]
[A, B]
[A, B, C]
[B, C, A] <- a stream of As keeps A at the head of the list.
[C, A, B]
[A, B, C]
[B, C, D] <- here, we evict A, we can do better! 
When you look at this example, you can easily see that we can do better - given the higher expected chance of requesting an A in the future, we should not evict it even if it was least recently used.

A - 12
B - 2
C - 2
D - 1
Least Frequently Used (LFU) cache takes advantage of this information by keeping track of how many times the cache request has been used in its eviction algorithm.

*/
