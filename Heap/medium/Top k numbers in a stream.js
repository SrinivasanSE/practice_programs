// https://www.geeksforgeeks.org/find-top-k-or-most-frequent-numbers-in-a-stream/


class MaxHeap {
    constructor() {
        this.heap = [];
    }

    push(item) {
        this.heap.push(item);
        this._heapifyUp();
    }

    pop() {
        const top = this.peek();
        const end = this.heap.pop();
        if (this.heap.length > 0) {
            this.heap[0] = end;
            this._heapifyDown();
        }
        return top;
    }

    peek() {
        return this.heap[0];
    }

    size() {
        return this.heap.length;
    }

    _heapifyUp() {
        let idx = this.heap.length - 1;
        while (idx > 0) {
            let parent = Math.floor((idx - 1) / 2);
            if (this._compare(this.heap[idx], this.heap[parent]) > 0) {
                [this.heap[idx], this.heap[parent]] = [this.heap[parent], this.heap[idx]];
                idx = parent;
            } else {
                break;
            }
        }
    }

    _heapifyDown() {
        let idx = 0;
        while (true) {
            let left = 2 * idx + 1;
            let right = 2 * idx + 2;
            let largest = idx;

            if (left < this.heap.length && this._compare(this.heap[left], this.heap[largest]) > 0) {
                largest = left;
            }
            if (right < this.heap.length && this._compare(this.heap[right], this.heap[largest]) > 0) {
                largest = right;
            }

            if (largest !== idx) {
                [this.heap[idx], this.heap[largest]] = [this.heap[largest], this.heap[idx]];
                idx = largest;
            } else {
                break;
            }
        }
    }

    // Compare for Max Heap: higher frequency first, then smaller number
    _compare(a, b) {
        if (a.freq === b.freq) return b.num - a.num; // smaller num first
        return a.freq - b.freq;
    }
}

function topKFrequentUntilEachIndex(arr, N, K) {
    const freqMap = new Map();
    const result = [];

    for (let i = 0; i < N; i++) {
        const num = arr[i];
        freqMap.set(num, (freqMap.get(num) || 0) + 1);

        const heap = new MaxHeap();

        for (const [key, freq] of freqMap.entries()) {
            heap.push({ num: key, freq });
        }

        const temp = [];
        let count = 0;
        while (heap.size() > 0 && count < K) {
            temp.push(heap.pop().num);
            count++;
        }

        result.push(temp);
    }

    return result;
}



class MinHeap {
    constructor() {
        this.heap = [];
    }

    push(item) {
        this.heap.push(item);
        this._heapifyUp();
    }

    pop() {
        const top = this.peek();
        const end = this.heap.pop();
        if (this.heap.length > 0) {
            this.heap[0] = end;
            this._heapifyDown();
        }
        return top;
    }

    peek() {
        return this.heap[0];
    }

    size() {
        return this.heap.length;
    }

    _heapifyUp() {
        let idx = this.heap.length - 1;
        while (idx > 0) {
            let parent = Math.floor((idx - 1) / 2);
            if (this._compare(this.heap[idx], this.heap[parent]) < 0) {
                [this.heap[idx], this.heap[parent]] = [this.heap[parent], this.heap[idx]];
                idx = parent;
            } else {
                break;
            }
        }
    }

    _heapifyDown() {
        let idx = 0;
        while (true) {
            let left = 2 * idx + 1;
            let right = 2 * idx + 2;
            let smallest = idx;

            if (left < this.heap.length && this._compare(this.heap[left], this.heap[smallest]) < 0) {
                smallest = left;
            }
            if (right < this.heap.length && this._compare(this.heap[right], this.heap[smallest]) < 0) {
                smallest = right;
            }

            if (smallest !== idx) {
                [this.heap[idx], this.heap[smallest]] = [this.heap[smallest], this.heap[idx]];
                idx = smallest;
            } else {
                break;
            }
        }
    }

    // Compare based on frequency (higher freq is better), and value (smaller is better)
    _compare(a, b) {
        if (a.freq === b.freq) {
            return a.num - b.num;
        }
        return a.freq - b.freq; // lower freq is worse in min-heap
    }
}

function topKFrequentUntilEachIndex(arr, N, K) {
    const freqMap = new Map();
    const result = [];

    for (let i = 0; i < N; i++) {
        const num = arr[i];
        freqMap.set(num, (freqMap.get(num) || 0) + 1);

        const heap = new MinHeap();

        for (const [key, freq] of freqMap.entries()) {
            heap.push({ num: key, freq });
            if (heap.size() > K) {
                heap.pop();
            }
        }

        const temp = [];
        while (heap.size()) {
            temp.push(heap.pop());
        }

        // Sort the result for current index based on required order
        temp.sort((a, b) => {
            if (b.freq === a.freq) return a.num - b.num;
            return b.freq - a.freq;
        });

        result.push(temp.map(item => item.num));
    }

    return result;
}

// Example usage
const N = 5, K = 4;
const arr = [5, 2, 1, 3, 2];
const output = topKFrequentUntilEachIndex(arr, N, K);

// Print the output
output.forEach(row => console.log(row.join(' ')));
