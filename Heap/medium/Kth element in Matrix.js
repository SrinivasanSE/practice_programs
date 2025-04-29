// https://www.geeksforgeeks.org/kth-smallest-element-in-a-row-wise-and-column-wise-sorted-2d-array

// Binary search sol is there

class Solution {
    kthSmallest(mat, n, k) {
        // code here
        const heap = new MaxHeap()
        
        for(let i = 0; i < n; i++) {
            for (let j = 0; j < n; j++) {
                if (heap.size() === k) {
                    if (heap.getMax() > mat[i][j]) {
                        heap.extractMax()
                        heap.insert(mat[i][j])
                    }
                } else {
                    heap.insert(mat[i][j])
                }
            }
        }
        
        return heap.extractMax()
    }
}

class Solution {
    kthSmallest(mat, n, k) {
        // code here
        const heap = new MinHeap()
        
        for(let i = 0; i < n; i++) {
            heap.insert({val: mat[i][0], row: i, col: 0})
        }
        
        let count = 0
        let ans = 0
        while (count < k) {
            let {val, row, col} = heap.extractMin()
            ans = val
            
            if (col + 1 < n) {
                heap.insert({val: mat[row][col + 1], row, col: col + 1})
            }
            count++
        }
        
        return ans
        
        
    }
}