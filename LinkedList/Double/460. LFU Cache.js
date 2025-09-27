// https://leetcode.com/problems/lfu-cache/description/

// Similar to LRU, but we store the freq and remove the nodes based on the freq


class Node {
    constructor(key, value) {
        this.key = key
        this.val = value
        this.prev = null
        this.next = null
        this.freq = 1
    }
}

class DLinkedList {
    constructor() {
        this.size = 0
        this.head = new Node(-1, -1)
        this.tail = new Node(-1, -1)
        this.head.next = this.tail
        this.tail.prev = this.head
    }

    insertNodeAtFront(node) {
        const next = this.head.next
        this.head.next = node
        node.prev = this.head
        node.next = next
        next.prev = node
        this.size++
    }

    removeNode(node) {
        const prev = node.prev
        const next = node.next
        prev.next = next
        next.prev = prev
        this.size--
    }

    removeTail() {
        if (this.size === 0) {
            return
        }
        const node = this.tail.prev
        this.removeNode(node)
        return node
    }
}

class LFUCache {
    constructor(capacity) {
        this.capacity = capacity
        this.minFreq = 0
        this.keyMap = new Map()
        this.freqMap = new Map()
    }

    get(key) {
        if (!this.keyMap.has(key)) return -1
        const node = this.keyMap.get(key)
        this.update(node)
        return node.val
    }

    put(key, value) {
        if (this.keyMap.has(key)) {
            const node = this.keyMap.get(key)
            node.val = value
            this.update(node)

        } else {
            if (this.keyMap.size === this.capacity) {
                const list = this.freqMap.get(this.minFreq)
                const node = list.removeTail()
                this.keyMap.delete(node.key)
                this.size--
            }

            const node = new Node(key, value)
            this.keyMap.set(key, node)
            const list = this.freqMap.get(1) || new DLinkedList()
            list.insertNodeAtFront(node)
            this.freqMap.set(1, list)
            this.minFreq = 1
            this.size++
        }
    }

    update(node) {
        const freq = node.freq
        const list = this.freqMap.get(freq)
        list.removeNode(node)

        if (freq === this.minFreq && list.size === 0) {
            this.minFreq++
        }

        node.freq++
        const newList = this.freqMap.get(node.freq) || new DLinkedList()
        newList.insertNodeAtFront(node)
        this.freqMap.set(node.freq, newList)
    }
}