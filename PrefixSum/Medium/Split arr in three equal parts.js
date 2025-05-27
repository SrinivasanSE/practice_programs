// https://www.geeksforgeeks.org/split-array-three-equal-sum-subarrays/

class Solution {

    findSplit(arr) {
        // Return an array of possible answer, driver code will judge and return true or
        // false based on
        
        const totalSum = arr.reduce((accum, curr) => accum + curr, 0)
        
        if (totalSum % 3 != 0 ) return [-1, -1]
        
        const requiredSum = totalSum / 3
        let runningSum = 0
        const n = arr.length
        const res = []
        for(let i = 0; i < n; i++) {
            runningSum += arr[i]
            
            if (runningSum === requiredSum) {
                res.push(i)
                runningSum  = 0
                
                if (res.length === 2 && i < n - 1) {
                    return res
                }
            }
        }
        
        return [-1, -1]
    }
}

/*
To split the array into three equal segments, we first need to make sure that the total sum of the array is divisible by 3. Then, as we iterate through the array, we calculate the running sum. If running sum becomes equal to one-third of the total, we reset the running sum to zero and store the index as the first element of the index pair. If we find another index for which the running sum becomes equal to one-third of the total and there are still elements left for a third segment, then store the index as the second element of the index pair and return the index pair.

We only need the first two segments with sum equal to one-third of the total because the remaining subarray will always be the third segment.
*/