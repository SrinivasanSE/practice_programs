// https://www.geeksforgeeks.org/problems/find-k-smallest-sum-pairs/1

class Solution {
    kSmallestPair(arr1, arr2, k) {
        // code here
        let res = []
        const n = arr1.length
        const m = arr2.length
        
        if (m === 0 || n === 0 || k === 0) return res
        
        if (k === 1) {
            return [[arr1[0], arr2[0]]]
        }
        
        const heap = new Heap()
        
        for (let i = 0; i < Math.min(k, n); i++) { // push all the elements from one array with first element from the another array
            heap.push({i, j: 0, sum: arr1[i] + arr2[0]})
        }
        
        while (!heap.isEmpty() && k > 0) {
            const {i, j} = heap.pop()
            
            res.push([arr1[i], arr2[j]])
            
            if (j + 1 < m) { // keep pushing the next element from the arr2
                heap.push({i, j: j + 1, sum: arr1[i] + arr2[j + 1]})
            }
            k--
        }
        return res
        
    }
}