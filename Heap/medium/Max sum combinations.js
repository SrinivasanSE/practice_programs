// https://www.geeksforgeeks.org/k-maximum-sum-combinations-two-arrays/


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
            if (this.heap[parent].sum < this.heap[index].sum) {
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

        if (left < this.heap.length && this.heap[left].sum > this.heap[largest].sum)
            largest = left;

        if (right < this.heap.length && this.heap[right].sum > this.heap[largest].sum)
            largest = right;

        if (largest !== index) {
            this.swap(index, largest);
            this.heapifyDown(largest);
        }
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



const _maxCombinations = (N, K, A, B) => {
    A.sort((a, b) => b - a)
    B.sort((a, b) => b - a)
    const res = []
    const heap = new MaxHeap()
    
    for(let i = 0; i < N; i++) {
        heap.insert({sum: A[i] + B[0], index: 0}) // we are keeping B constan
    }
    console.log(A, B)
    let curr
    console.log(heap.heap)
    while(K > 0) {
        curr = heap.extractMax()
        console.log(curr, 'curr')
        res.push(curr.sum)
        
        if (curr.index < N - 1) {
            heap.insert({sum: curr.sum - B[curr.index] + B[curr.index + 1], index: curr.index + 1}) // we are getting the A's value by subtracting the B's value from sum
        }
        K--
    }
    
    return res
}

// Another approach using set, set is needed because of duplicates
const maxCombinations = (N, K, A, B) => {
    A.sort((a, b) => b - a)
    B.sort((a, b) => b - a)
    const res = []
    const heap = new MaxHeap()
    
    heap.insert({sum: A[0] + B[0], i: 0, j: 0})
    const hashmap = new Set()
    hashmap.add(`0_0`)
    let curr
    while(K > 0) {
        const {sum, i, j} = heap.extractMax()
        res.push(sum)
        
        if (i + 1 < N && !hashmap.has(`${i + 1}_${j}`)) {
            heap.insert({sum: A[i + 1] + B[j], i: i + 1, j})
            hashmap.add(`${i + 1}_${j}`)
        }
        if (j + 1 < N && !hashmap.has(`${i}_${j + 1}`)) {
            heap.insert({sum: A[i] + B[j + 1], i, j: j + 1})
            hashmap.add(`${i}_${j + 1}`)
        }
        K--
    }
    
    return res
}

console.log(maxCombinations(4, 3, [1, 4, 2, 3], [2, 5, 1, 6]))