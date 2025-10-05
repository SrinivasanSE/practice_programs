// https://www.geeksforgeeks.org/minimize-sum-product-two-arrays-permutations-allowed/

// O(nlogn) & O(1)

class Solution {
    minValue(arr1, arr2) {
        // code here
        let res = 0
        
        arr1.sort((a, b) => a - b) // asc order
        arr2.sort((a, b) => b - a) // desc order
        
        
        for(let i = 0; i < arr1.length; i++) {
            res += arr1[i]*arr2[i] // to minimise the sum, we multiplying the smaller number from one array and bigger num from another array
        }
        
        return res
    }
}
