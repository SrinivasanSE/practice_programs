// https://www.geeksforgeeks.org/find-if-there-is-a-subarray-with-0-sum/


class Solution {
    // Function to check whether there is a subarray present with 0-sum or not.
    subArrayExists(arr) {
        // code here
        let currSum = 0
        const prefixSum = new Set()
        
        for(let num of arr) {
            currSum += num
            
            if (currSum === 0 || prefixSum.has(currSum)) {
                return true
            }
            
            prefixSum.add(currSum)
        }
        
        return false
    }
}

/*

If at two different indices i and j (where i < j), the prefix sums are equal (prefixSum[i] == prefixSum[j]), then the sum of the elements between these indices is zero.
This is because the elements between i+1 and j cancel out the sum added from the start to i, resulting in the same prefix sum at j.

*/