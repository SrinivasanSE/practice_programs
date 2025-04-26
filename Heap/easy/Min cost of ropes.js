// https://www.geeksforgeeks.org/connect-n-ropes-minimum-cost/

class Solution {
    minCost(arr) {
        if (arr.length <= 1) return 0;

        // Initialize the heap with the elements in arr
        this.heap = [];
        for (const num of arr) {
            this.insert(num);
        }

        let totalCost = 0;

        // Continue combining ropes until only one remains
        while (this.size() > 1) {
            const val1 = this.extractMin();
            const val2 = this.extractMin();
            const combinedCost = val1 + val2;
            totalCost += combinedCost;
            this.insert(combinedCost);
        }

        return totalCost;
    }

    // Insert a value into the heap
    insert(value) {
        this.heap.push(value);
        this._heapifyUp(this.heap.length - 1);
    }

    // Extract the minimum value from the heap
    extractMin() {
        if (this.heap.length === 1) return this.heap.pop();

        const min = this.heap[0];
        this.heap[0] = this.heap.pop();
        this._heapifyDown(0);
        return min;
    }

    // Get the size of the heap
    size() { return this.heap.length; }

    // Helper method to maintain the heap property on insertion
    _heapifyUp(index) {
        let parent = Math.floor((index - 1) / 2);
        while (index > 0 && this.heap[index] < this.heap[parent]) {
            [this.heap[index], this.heap[parent]] =
                [ this.heap[parent], this.heap[index] ];
            index = parent;
            parent = Math.floor((index - 1) / 2);
        }
    }

    // Helper method to maintain the heap property on extraction
    _heapifyDown(index) {
        let smallest = index;
        const left = 2 * index + 1;
        const right = 2 * index + 2;

        if (left < this.heap.length && this.heap[left] < this.heap[smallest]) {
            smallest = left;
        }

        if (right < this.heap.length && this.heap[right] < this.heap[smallest]) {
            smallest = right;
        }

        if (smallest !== index) {
            [this.heap[index], this.heap[smallest]] =
                [ this.heap[smallest], this.heap[index] ];
            this._heapifyDown(smallest);
        }
    }
}