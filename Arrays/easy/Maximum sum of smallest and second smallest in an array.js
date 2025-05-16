// https://www.geeksforgeeks.org/maximum-sum-of-smallest-and-second-smallest-in-an-array/

class Solution {
    maxSum(arr) {
        // code here
        const n = arr.length
        
        if (n < 2) {
            return -1
        }
        let res = -1
        let sum 
        for(let i = 0; i < n - 1; i++) {
            sum = arr[i] + arr[i + 1]
            res = Math.max(sum, res)
        }
        
        return res
    }
}


/*

For a subarray with 2 elements, 1st and 2nd smallest elements are those 2 elements. Now, x and y are present in some subarray such that they are the endpoints. Now, x, y must be the smallest 2 elements of that subarray. If there are other elements Z1 , Z2, ......., ZK  between x and y, they are greater than or equal to x and y,

Case1 : 
If there is one element z between x and y, then the smaller subarray with the elements max(x,y) and z , should be the answer, because max(x,y) + z >= x + y
Case2:

If there are more than one elements between x and y, then the subarray within x and y will have all consecutive elements  (Zi + Zi+1) >= (x+y),  so (x,y) pair can't be the answer. 
So, by contradictions, x and y must be consecutive elements in the array.

*/