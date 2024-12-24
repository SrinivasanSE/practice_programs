//https://www.geeksforgeeks.org/k-largestor-smallest-elements-in-an-array/

// revisit and implement using heap


class Solution {
    kLargest(arr, k) {
        
        const heap = arr.slice(0, k)
        heap.sort((a, b) => a - b)
        
        for(let i = k; i < arr.length; i++) {
            if (heap[0] < arr[i]) {
                heap.shift()
                heap.push(arr[i])
                heap.sort((a, b) => a - b)
            }
        }
        
        const res = []
        
        while(heap.length > 0) {
            res.push(heap.pop())
        }
        
        return res
    }
}
