// https://www.geeksforgeeks.org/number-subarrays-product-less-k/

// Check the binary search approach


class Solution {
    // Function to count number of subarrays with product less than k.
    countSubArrayProductLessThanK(arr, n, k) {
        // your code here
        let count = 0, start = 0
        
        let prod = 1
        
        for(let end = 0; end < n; end++) {
            prod *= arr[end]
            
            while (prod >= k && start < end) {
                prod/=arr[start]
                start++
            }
            
            if (prod < k)
            count += end - start + 1 // This is because only subarrays starting from start to end and ending at end are valid within the current window.
        }
        
        
        return count
    }
}