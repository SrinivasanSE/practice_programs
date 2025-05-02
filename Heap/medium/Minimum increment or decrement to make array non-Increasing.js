// https://www.geeksforgeeks.org/minimum-incrementdecrement-to-make-array-non-increasing/

class Solution {
    // Function to find minimum number of operations to make all elements equal.
    minOperations(arr, n) {
        // your code here
        const heap = new MinHeap()
        let ans = 0
        for(let i = 0; i < n; i++) {
            if (!heap.isEmpty() && heap.getMin() < arr[i]) {
                ans += (arr[i] - heap.getMin())
                heap.extractMin()
                heap.insert(arr[i])
            }
            heap.insert(arr[i]) // why do we push again?
        }
        return ans
    }
}