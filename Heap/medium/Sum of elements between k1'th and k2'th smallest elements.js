// https://www.geeksforgeeks.org/sum-elements-k1th-k2th-smallest-elements/


// Using Min Heap
class Solution {
    
    sumBetweenTwoKth(A, N, K1, K2) {
        // code here
        let sum = 0
        const heap = new MinHeap()
        for (let num of A) {
            heap.insert(num)
        }
        
        for(let i = 0; i < K1; i++) {
            heap.extractMin()
        }
        
        for (let i = K1; i < K2 - 1; i++) {
            sum += heap.extractMin()
        }
        
        return sum
    }
}

// Using Max Heap


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

    peek() {
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
class Solution {
    
    sumBetweenTwoKth(A, N, K1, K2) {
        // code here
       const heap = new MaxHeap()
       
       for (let num of A) {
           heap.insert(num)
           if (heap.size() > K2) {
               heap.extractMax()
           }
       }
       // Heap will contain the elements in opposite order, K2 smallest element will be at the top
       heap.extractMax() // K2 element is not included
       let sum = 0
       while (heap.size() > K1) { // we sum the elements at the top leaving only K1 smallest elements at the end
           sum += heap.extractMax()
       }
        
        return sum
    }
}