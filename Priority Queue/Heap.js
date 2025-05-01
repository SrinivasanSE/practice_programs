// https://www.geeksforgeeks.org/priority-queue-using-binary-heap/


// Function to return the index of the
// parent node of a given node
function parent(i) {
    return Math.floor((i - 1) / 2);
}

// Function to return the index of the
// left child of the given node
function leftChild(i) {
    return ((2 * i) + 1);
}

// Function to return the index of the
// right child of the given node
function rightChild(i){
    return ((2 * i) + 2);
}

// Function to shift up the node in order
// to maintain the heap property
function shiftUp(i, arr) {
    while (i > 0 && arr[parent(i)] < arr[i]) {

        // Swap parent and current node
        let temp = arr[parent(i)];
        arr[parent(i)] = arr[i];
        arr[i] = temp;

        // Update i to parent of i
        i = parent(i);
    }
}

// Function to shift down the node in
// order to maintain the heap property
function shiftDown(i, arr, size) {
    let maxIndex = i;

    // Left Child
    let l = leftChild(i);

    if (l <= size && arr[l] > arr[maxIndex]) {
        maxIndex = l;
    }

    // Right Child
    let r = rightChild(i);

    if (r <= size && arr[r] > arr[maxIndex]) {
        maxIndex = r;
    }

    // If i not same as maxIndex
    if (i != maxIndex) {
        let temp = arr[i];
        arr[i] = arr[maxIndex];
        arr[maxIndex] = temp;
        shiftDown(maxIndex, arr, size);
    }
}

// Function to insert a new element
// in the Binary Heap
function insert(p, arr, sizeObj) {
    sizeObj.size = sizeObj.size + 1;
    arr.push(p);

    // Shift Up to maintain heap property
    shiftUp(sizeObj.size, arr);
}

// Function to extract the element with
// maximum priority
function extractMax(arr, sizeObj) {
    let result = arr[0];

    // Replace the value at the root
    // with the last leaf
    arr[0] = arr[sizeObj.size];
    sizeObj.size = sizeObj.size - 1;

    // Shift down the replaced element
    // to maintain the heap property
    shiftDown(0, arr, sizeObj.size);
    return result;
}

// Function to change the priority
// of an element
function changePriority(i, p, arr, sizeObj) {
    let oldp = arr[i];
    arr[i] = p;

    if (p > oldp) {
        shiftUp(i, arr);
    }
    else {
        shiftDown(i, arr, sizeObj.size);
    }
}

// Function to get value of the current
// maximum element
function getMax(arr) {
    return arr[0];
}

// Function to remove the element
// located at given index
function remove(i, arr, sizeObj) {
    arr[i] = getMax(arr) + 1;

    // Shift the node to the root
    // of the heap
    shiftUp(i, arr);

    // Extract the node
    extractMax(arr, sizeObj);
}


 
class PriorityQueue {
    constructor(func) {
        this.heap = []
        this.compare = func
    }
    
    enqueue(data) {
        this.heap.push(data)
        this.bubbleUp()
    }
    
    bubbleUp() {
        let index = this.heap.length - 1
        let parent
        const arr = this.heap
        while (index > 0) {
            parent = Math.floor((index - 1)/2)
            if (this.compare(arr[index], arr[parent]) < 0) {
                [arr[parent], arr[index]] = [arr[index], arr[parent]]
                index = parent
            } else {
                break
            }
            
        }
    }
    
    dequeue() {
        if (this.heap.length === 0) return
        if (this.heap.length === 1) return this.heap.pop()
        
        const val = this.heap[0]
        this.heap[0] = this.heap.pop()
        this.heapify(0)
        return val
    }
    
    heapify(index) {
        let curr = index
        const left = 2*index + 1
        const right = 2*index + 2
        const n = this.heap.length
        const arr = this.heap
        if (left < n && this.compare(arr[left], arr[curr]) < 0) {
            curr = left
        }
        
        if (right < n && this.compare(arr[right], arr[curr]) < 0) {
            curr = right
        }
        
        if (curr != index) {
            [arr[curr], arr[index]] = [arr[index], arr[curr]]
            this.heapify(curr)
        }
    }
    
    isEmpty() {
        return this.heap.length === 0
    }
    
    size() {
        return this.heap.length
    }
}

const compare = (a, b) => {
    if (a.diff != b.diff)
        return b.diff - a.diff
        
    return a.value - b.value
        
    
}