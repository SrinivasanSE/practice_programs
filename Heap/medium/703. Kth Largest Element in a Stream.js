// https://www.geeksforgeeks.org/kth-largest-element-in-a-stream/
// https://leetcode.com/problems/kth-largest-element-in-a-stream/description/

// Using array

function kthLargest(arr, k) {

    // Array to store the final results
    let res = [];

    let st = [];

    for (let i = 0; i < arr.length; i++) {

        // Insert current element in the set (st)
        st.push(arr[i]);
        st.sort((a, b) => a - b);

        // If the size of the set exceeds k,
        // remove the smallest element
        if (st.length > k) {
            st.shift();
        }

        // If set size is at least k, top 
        // element will be the kth largest
        if (st.length == k) {
            
            // The first element is the kth largest
            res.push(st[0]);  
        } 
        else {
            
            // Less than k elements so far, push -1
            res.push(-1);
        }
    }

    return res;
}

// Using heap , O(nlogk) & O(k)
class Solution {
    kthLargest(arr, k, n) {
        // code here
        const out = []
        if (n === 1) {
            return arr
        }
        const heap = new MinHeap()
        for(let num of arr) {
    
            if (heap.size() < k) { // heap has less than k elements, so push to heap
                 heap.insert(num)
            }
            else if (heap.getMin() < num) { // heap has k elements elements, replace the top if new element is greater
                    heap.extractMin()
                    heap.insert(num)
            } 
            if (heap.size() < k) { // if there are not enough elements in the heap, there will no kth largest, so we return -1
                out.push(-1)
            } else {
                out.push(heap.getMin())
        }
            }
        
        return out
    }
}


var KthLargest = function (k, nums) {
    this.heap = new MinHeapC()
    this.k = k
    for (let num of nums) { // O(nlogk)
        this.insert(num)
    }
};

KthLargest.prototype.insert = function (num) {
    if (this.heap.size() === this.k) {
        if (this.heap.getMin() < num) {
            this.heap.extractMin()
            this.heap.insert(num)
        }
    } else {
        this.heap.insert(num)
    }
}


KthLargest.prototype.add = function (val) {
    this.insert(val) // O(logk)

    return this.heap.getMin()
}