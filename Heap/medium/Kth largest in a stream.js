// https://www.geeksforgeeks.org/kth-largest-element-in-a-stream/


class Solution {
    kthLargest(arr, k, n) {
        // code here
        const out = []
        if (n === 1) {
            return arr
        }
        const heap = new MinHeap()
        for(let num of arr) {
    
            if (heap.size() < k) {
                 heap.insert(num)
            }
            else if (heap.getMin() < num) {
                    heap.extractMin()
                    heap.insert(num)
            } 
            if (heap.size() < k) {
                out.push(-1)
            } else {
                out.push(heap.getMin())
        }
            }
        
        return out
    }
}