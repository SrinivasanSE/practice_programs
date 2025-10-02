// https://www.geeksforgeeks.org/connect-n-ropes-minimum-cost/

// O(nlogn) & O(n)

class Solution {
    minCost(arr) {
        if (arr.length <= 1) return 0;

        // Initialize the heap with the elements in arr
        const heap = new MinHeap();
        for (const num of arr) {
            heap.insert(num);
        }

        let totalCost = 0;

        // Continue combining ropes until only one remains
        while (heap.size() > 1) {
            const val1 = heap.extractMin();
            const val2 = heap.extractMin();
            const combinedCost = val1 + val2;
            totalCost += combinedCost;
            heap.insert(combinedCost);
        }

        return totalCost;
    }

}