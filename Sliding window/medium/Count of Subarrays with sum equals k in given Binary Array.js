// https://www.geeksforgeeks.org/count-of-subarrays-with-sum-equals-k-in-given-binary-array/



class Solution {
    
    _numberOfSubarrays(arr, target) {
        // Your code goes here.
        let sum = 0
        
        const n = arr.length
        let start = 0, count = 0
        for(let end = 0; end < n; end++) {
            sum += arr[end]
            
            
            while (sum > target) {
                sum -= arr[start]
                start++
            }
            count += end - start + 1
        }
        
        return count
        
    }
    
    numberOfSubarrays(arr, target) {
        
        return this._numberOfSubarrays(arr, target) - this._numberOfSubarrays(arr, target - 1) // first func call will include counts of arr with sum <=k, from this if we subtract the count of arr with sum less than k, we can get the ans
    }
}

// Prefix Sum

class Solution {
    numberOfSubarrays(arr, target) {
        // Your code goes here.
        let sum = 0
        const n = arr.length
        let count = 0
        let hashmap = new Map()
        for(let end = 0; end < n; end++) {
            sum += arr[end]
            
            if (sum - target === 0) {
                count++
            } if (hashmap.has(sum - target)) {
                count += hashmap.get(sum - target)
            }
            
            hashmap.set(sum, (hashmap.get(sum) || 0) + 1)
            
        }
        
        return count
        
    }
}