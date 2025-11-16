// https://www.geeksforgeeks.org/find-subarray-with-given-sum-in-array-of-integers/

class Solution {
    subarraySum(arr, target) {
        const n = arr.length
        let start = 0, sum = 0
        
        for(let end = 0; end < n; end++) {
            sum += arr[end]
            while(sum > target && start < end) {
                sum-=arr[start]
                start++
            }
            
            if (sum === target) {
                return [start + 1, end + 1]
            }
        }
        
        return [-1]
        
    }
}

// hashmap for negative/positive numbers

subarraySum(arr, target) {
        const n = arr.length
        const hashmap = new Map() // if the sum is found in the hashmap, 
  // sum - target is available in the hashmap, that means we can ignore the index upto the hashmap found index, remaining will sum to the target upto the current num
        let sum = 0
        
       for(let i = 0; i < n; i++) {
           sum += arr[i]
           
           if (sum - target === 0) {
               return [1, i + 1]
           }
           
           if (hashmap.has(sum - target)) {
               return [hashmap.get(sum - target) + 2, i + 1]
           }
           
           hashmap.set(sum, i)
        
       }
       
       return [-1]
        
    }
