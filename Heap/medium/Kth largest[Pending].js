// https://leetcode.com/problems/kth-largest-element-in-an-array/description/

// Learn Quickselect approach

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
            if (heap.size() === k) {
                if (heap.getMin() < arr[i]) { // if we get an element which is greater than the ele in the heap at the top, we should add
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


class Solution {
    kthSmallest(arr, k) {
        // code here
        const heap = new MaxHeap()
        for (let i = 0; i < arr.length; i++) { // O(n)
            if (heap.size() === k) {
                if (heap.getMax() > arr[i]) { // if we get an element which is smaller than the ele in the heap at the top, we should add it because we need smaller elements
                    heap.extractMax()
                    heap.insert(arr[i])
                }
            } else {
                heap.insert(arr[i]) // O(logk)
            }
        }


        return heap.extractMax()
    }
}