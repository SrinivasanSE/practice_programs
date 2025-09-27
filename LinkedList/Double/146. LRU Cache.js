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
        if (this.map.has(key)) { // if the key is already present, update the value and move that to the front
            const node = this.map.get(key);
            node.val = value;
            this.list.removeNode(node);
            this.list.insertAtFront(node);
        } else {
            if (this.map.size === this.capacity) { // if the capacity exceeds, delete from the end
                const nodeToRemove = this.list.removeTail();
                if (nodeToRemove) this.map.delete(nodeToRemove.key);
            }
            const node = new Node(key, value);
            this.list.insertAtFront(node);  // add the new node at the front
            this.map.set(key, node); 
        }
    }
}