// https://www.geeksforgeeks.org/count-distinct-elements-in-every-window-of-size-k/


class Solution {
    countDistinct(arr, k) {
        // code here
        let hashmap = new Map()
        let count = 0
        let res = []
        const n = arr.length
        for(let i = 0; i < k; i++) {
            
            hashmap.set(arr[i], (hashmap.get(arr[i]) || 0) + 1)
        }
        res.push(hashmap.size)
        for(let i = k; i < n; i++) {
            hashmap.set(arr[i - k], hashmap.get(arr[i - k]) - 1)
            hashmap.set(arr[i], (hashmap.get(arr[i]) || 0) + 1)
            if (hashmap.get(arr[i - k]) === 0) {
 
                hashmap.delete(arr[i - k])
            }
            
            res.push(hashmap.size)
        }
        
        return res
    }
}