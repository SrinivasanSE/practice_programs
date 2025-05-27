// https://www.geeksforgeeks.org/minimum-swaps-required-bring-elements-less-equal-k-together/


class Solution {

    minSwap(arr, k) {
        // code here
        let count = 0
        const n = arr.length
        for(let i = 0; i < n; i++) {
            if (arr[i] <= k) {
                count++
            }
        }
        
        let res = Infinity
        let c = 0
        for(let i = 0; i < count; i++) {
            if (arr[i] > k) {
                c++
            }
        }
        
        res = c
        
        for(let i = count; i < n; i++) {
            if (arr[i] > k) {
                c++
            }
            if (arr[i - count] > k) {
                c--
            }
            
            res = Math.min(res, c)
        }
        
        return res
    }
}

/*
Count the number of elements <= k in the array, say this count is count_k.
Use a window of size count_k and find the number of elements greater than k in this window.
Slide the window across the array and keep track of the minimum number of elements greater than k found in any window.
The result is the minimum number of swaps required.

*/