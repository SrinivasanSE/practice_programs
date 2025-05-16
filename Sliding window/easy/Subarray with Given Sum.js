// https://www.geeksforgeeks.org/find-subarray-with-given-sum/

// This sol won't work for arr with negative numbers
class Solution {
    // Function to find a continuous sub-array which adds up to a given number.
    subarraySum(arr, sum) {
        
        let res = []
        const n = arr.length
        let start = 0, currSum = 0
        
        for(let end = 0; end < n; end++) {
            
            currSum += arr[end]

           if (currSum >= sum) {
            
            while (currSum > sum && start < end) {
                currSum-=arr[start]
                start+=1
            }
            
            if (currSum === sum) {
                return [start + 1, end + 1]
            }
           }
        }
        
        return res
    }
}

// works for negative nums
class Solution {
    // Function to find a continuous sub-array which adds up to a given number.
    subarraySum(arr, tar) {
        
        const hashmap = new Map()
        let start = 0
        let end = -1
        let currSum = 0
        for(let i = 0; i < arr.length; i++) {
            currSum += arr[i]
            const reqNum = currSum - tar
            if (reqNum === 0) {
                end = i
                break
            }
            
            if (hashmap.has(reqNum)) {
                start = hashmap.get(reqNum)
                end = i
                break
            }
            
            hashmap.set(currSum, i + 1)
        }
        
        return end === -1 ? [] : [start + 1, end + 1]
    }
}

// Return the count of the subarrays
class Solution {
    // Function to count the number of subarrays which adds to the given sum.
    subArraySum(arr, tar) {
        // code here
        const hashmap = new Map()
        let currSum = 0
        let count = 0
        for(let i = 0; i < arr.length; i++) {
            currSum += arr[i]
            const reqNum = currSum - tar
            if (currSum === tar) {
                count++
            }
            if (hashmap.has(reqNum)) {
               count+= hashmap.get(reqNum)
            }
            
            hashmap.set(currSum, (hashmap.get(currSum) || 0) + 1)
        }
    
        
        return count
    }
}