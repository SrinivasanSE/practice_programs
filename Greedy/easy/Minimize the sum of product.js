// https://www.geeksforgeeks.org/minimize-sum-product-two-arrays-permutations-allowed/

class Solution {
    minValue(arr1, arr2) {
        // code here
        let res = 0
        
        arr1.sort((a, b) => a - b)
        arr2.sort((a, b) => b - a)
        
        
        for(let i = 0; i < arr1.length; i++) {
            res += arr1[i]*arr2[i]
        }
        
        return res
    }
}
