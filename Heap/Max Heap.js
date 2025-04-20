class MaxHeap {
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
            if (this.heap[parent] < this.heap[index]) {
                this.swap(parent, index);
                index = parent;
            } else {
                break;
            }
        }
    }

    extractMax() {
        if (this.heap.length === 0) return null;
        if (this.heap.length === 1) return this.heap.pop();

        const max = this.heap[0];
        this.heap[0] = this.heap.pop();
        this.heapifyDown(0);
        return max;
    }

    heapifyDown(index) {
        let largest = index;
        let left = this.getLeftChildIndex(index);
        let right = this.getRightChildIndex(index);

        if (left < this.heap.length && this.heap[left] > this.heap[largest])
            largest = left;

        if (right < this.heap.length && this.heap[right] > this.heap[largest])
            largest = right;

        if (largest !== index) {
            this.swap(index, largest);
            this.heapifyDown(largest);
        }
    }

    getMax() {
        return this.heap.length === 0 ? null : this.heap[0];
    }

    increaseKey(index, newVal) {
        if (index >= this.heap.length || newVal < this.heap[index]) return;
        this.heap[index] = newVal;
        this.heapifyUp(index);
    }

    decreaseKey(index, newVal) {
        if (index >= this.heap.length || newVal > this.heap[index]) return;
        this.heap[index] = newVal;
        this.heapifyDown(index);
    }

    deleteKey(index) {
        this.increaseKey(index, Number.POSITIVE_INFINITY);
        this.extractMax();
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
