// 



class Solution {
    // Function to return kth largest element from an array.
    KthLargest(arr, k) {
        // code here
        const heap = new MinHeap()
        for(let i = 0; i < arr.length; i++) {
            //console.log(heap.size())
            if (heap.size() === k ) {
                if (heap.getMin() < arr[i]) {
                heap.extractMin()
                heap.insert(arr[i])
            } }else {
                heap.insert(arr[i])
            }
            }
        
        
        return heap.extractMin()
    }
}