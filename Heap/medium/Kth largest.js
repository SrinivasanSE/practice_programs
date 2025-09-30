// https://leetcode.com/problems/kth-largest-element-in-an-array/description/

/*

Heap
O(nlogk) & O(k)

*/

class Solution {
    // Function to return kth largest element from an array.
    KthLargest(arr, k) {
        // code here
        const heap = new MinHeap()
        for (let i = 0; i < arr.length; i++) { // O(n)
            //console.log(heap.size())
            if (heap.size() === k) {
                if (heap.getMin() < arr[i]) { // if we get an element which is greater than the min ele in the heap at the top, we should add
                    heap.extractMin()
                    heap.insert(arr[i])
                }
            } else {
                heap.insert(arr[i]) // O(logk)
            }
        }


        return heap.extractMin()
    }
}