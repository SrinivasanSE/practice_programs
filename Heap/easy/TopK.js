// https://www.geeksforgeeks.org/problems/gadgets-of-doraland--141631/1?page=1&category=Heap&difficulty=Basic,Easy&status=unsolved&sortBy=submissions

class MaxHeap {
    constructor() {
        this.heap = [];
    }

    parentIndex(index) { return Math.floor((index - 1) / 2); }
    leftChildIndex(index) { return 2 * index + 1; }
    rightChildIndex(index) { return 2 * index + 2; }

    push({ num, freq }) {
        this.heap.push({ num, freq });
        this.heapifyUp();
    }

    pop() {
        if (this.size() === 1) {
            return this.heap.pop();
        }
        const root = this.heap[0];
        this.heap[0] = this.heap.pop();
        this.heapifyDown(0);
        return root;
    }

    swap(i, j) {
        [this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]];
    }

    heapifyUp() {
        let index = this.heap.length - 1;
        while (index > 0 && 
              (this.heap[index].freq > this.heap[this.parentIndex(index)].freq || 
              (this.heap[index].freq === this.heap[this.parentIndex(index)].freq && this.heap[index].num > this.heap[this.parentIndex(index)].num))) {
            this.swap(index, this.parentIndex(index));
            index = this.parentIndex(index);
        }
    }

    heapifyDown(index) {
        let largest = index;
        let left = this.leftChildIndex(index);
        let right = this.rightChildIndex(index);

        if (left < this.heap.length && 
           (this.heap[left].freq > this.heap[largest].freq || 
           (this.heap[left].freq === this.heap[largest].freq && this.heap[left].num > this.heap[largest].num))) {
            largest = left;
        }

        if (right < this.heap.length && 
           (this.heap[right].freq > this.heap[largest].freq || 
           (this.heap[right].freq === this.heap[largest].freq && this.heap[right].num > this.heap[largest].num))) {
            largest = right;
        }

        if (largest !== index) {
            this.swap(index, largest);
            this.heapifyDown(largest);
        }
    }

    size() {
        return this.heap.length;
    }
}

class Solution {
    TopK(array, k) {
        const frequencyMap = new Map();
        
        for (let num of array) {
            frequencyMap.set(num, (frequencyMap.get(num) || 0) + 1);
        }

        const maxHeap = new MaxHeap();
        for (let [num, freq] of frequencyMap.entries()) {
            maxHeap.push({ num, freq });
        }

        const result = [];
        for (let i = 0; i < k && maxHeap.size() > 0; i++) {
            result.push(maxHeap.pop().num);
        }

        return result;
    }
}
