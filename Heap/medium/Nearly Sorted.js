// https://www.geeksforgeeks.org/nearly-sorted-algorithm/

class Solution {
    nearlySorted(arr, k) {
        // code
        const heap = new MinHeap()
        
        for(let i = 0; i < k; i++) {
            heap.push(arr[i])
        }
        const n = arr.length
        let index = 0
        for(let i = k; i < n; i++) {
            heap.push(arr[i])
            arr[index] = heap.pop()
            index+=1
        }
        
        while(!heap.isEmpty()) {
            arr[index] = heap.pop()
            index++
        }
    }
}


/*

🔧 Problem Reminder:
Every element is at most k positions away from its target position in the sorted array.

That means:

The element that should go at index 0 must be somewhere in the first k+1 elements.

Similarly, for index 1, the right value is within index 1 to 1+k.

So on.

✅ Why fill the heap with the first k elements?
We’re actually going to fill it with k+1 as soon as the loop starts — but we preload k so that we can:

Keep a moving window of k+1 candidates from which the smallest is always popped.

*/