// https://www.geeksforgeeks.org/find-subarray-with-given-sum/


/*

Optimal - This sol won't work for arr with negative numbers

O(n) & O(1)

*/


class Solution {
    subarraySum(arr, sum) {
        
        let res = []
        const n = arr.length
        let start = 0, currSum = 0
        
        for(let end = 0; end < n; end++) {
            
            currSum += arr[end]

            
            while (currSum > sum && start < end) {
                currSum-=arr[start]
                start+=1
            }
            
            if (currSum === sum) {
                return [start + 1, end + 1]
            }
        }
        
        return res
    }
}

/*

Optimal - works for negative nums

O(n) & O(n)

*/

class Solution {
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
            
            if (hashmap.has(reqNum)) { // if the hashmap already has the value, that means after that index to the current index, the sum will be the target
                start = hashmap.get(reqNum) + 1
                end = i
                break
            }
            
            hashmap.set(currSum, i)
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