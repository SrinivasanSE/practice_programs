// https://www.geeksforgeeks.org/k-th-largest-sum-contiguous-subarray/

// Using prefix sum
class Solution {
    // Function to find the kth largest element in the given array.
    kthLargest(arr, k) {
        const heap = new MinHeap()
        
        const n = arr.length
        
        if (n === 1) {
            return arr[0]
        }
        const ps = new Array(n + 1).fill(0)
        ps[1] = arr[0]
        for(let i = 2; i <= n; i++) { // should go till n
            ps[i] = ps[i - 1] + arr[i - 1]
        }
        let currSum
        for(let i = 0; i < n; i++) {
            for(let j = i; j < n; j++) {
                currSum = ps[j + 1] - ps[i]  // j should start from 1 and i should be 0, if i is 1, i - 1 should be used
                if (heap.size() === k) {
                    if (heap.getMin() < currSum) {
                    heap.extractMin()
                    heap.insert(currSum)
                    }
                } else {
                    heap.insert(currSum)
                }
            }
        }
        //console.log(heap.heap)
        return heap.extractMin()
    }
}
class Solution {
    // Function to find the kth largest element in the given array.
    kthLargest(arr, k) {
        const heap = new MinHeap()
        
        const n = arr.length
        
        if (n === 1) {
            return arr[0]
        }
        let currSum = 0
        for(let i = 0; i < n; i++) {
            currSum = 0
            for(let j = i; j < n; j++) {
                currSum += arr[j]
                if (heap.size() === k) {
                    if (heap.getMin() < currSum) {
                    heap.extractMin()
                    heap.insert(currSum)
                    }
                } else {
                    heap.insert(currSum)
                }
            }
        }
        //console.log(heap.heap)
        return heap.extractMin()
    }
}