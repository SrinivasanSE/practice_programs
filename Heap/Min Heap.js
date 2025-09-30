// https://www.geeksforgeeks.org/binary-heap/

class MinHeap {
    constructor() {
        this.heap = [];
    }

    getParentIndex(i) { return Math.floor((i - 1) / 2); }
    getLeftChildIndex(i) { return 2 * i + 1; }
    getRightChildIndex(i) { return 2 * i + 2; }

    swap(i, j) {
        [this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]];
    }

    insert(value) {
        this.heap.push(value);
        this.heapifyUp(this.heap.length - 1);
    }

    heapifyUp(index) {
        while (index > 0) {
            let parent = this.getParentIndex(index);
            if (this.heap[parent] > this.heap[index]) {
                this.swap(parent, index);
                index = parent;
            } else {
                break;
            }
        }
    }

    heapifyDown(index) {
        let smallest = index;
        let left = this.getLeftChildIndex(index);
        let right = this.getRightChildIndex(index);

        if (left < this.heap.length && this.heap[left] < this.heap[smallest])
            smallest = left;

        if (right < this.heap.length && this.heap[right] < this.heap[smallest])
            smallest = right;

        if (smallest !== index) {
            this.swap(index, smallest);
            this.heapifyDown(smallest);
        }
    }

    extractMin() {
        if (this.heap.length === 0) return null;
        if (this.heap.length === 1) return this.heap.pop();

        const min = this.heap[0];
        this.heap[0] = this.heap.pop();
        this.heapifyDown(0);
        return min;
    }

    getMin() {
        return this.heap.length === 0 ? null : this.heap[0];
    }

    decreaseKey(index, newVal) { // to decrease the value of a node, since we decrease it, we move the node up
        if (index >= this.heap.length || newVal > this.heap[index]) return;
        this.heap[index] = newVal;
        this.heapifyUp(index);
    }

    increaseKey(index, newVal) { 
        if (index >= this.heap.length || newVal < this.heap[index]) return;
        this.heap[index] = newVal;
        this.heapifyDown(index);
    }

    deleteKey(index) {
        this.decreaseKey(index, Number.NEGATIVE_INFINITY);
        this.extractMin();
    }

    size() {
        return this.heap.length;
    }

    isEmpty() {
        return this.heap.length === 0;
    }

    print() {
        console.log(this.heap);
    }
}
