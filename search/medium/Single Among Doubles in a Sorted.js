// https://www.geeksforgeeks.org/problems/find-the-element-that-appears-once-in-sorted-array0624/1?page=1&category=Searching&difficulty=Easy&sortBy=submissions

/*
Given a sorted array arr[]. Find the element that appears only once in the array. All other elements appear exactly twice. 
*/

/*
The idea is to use binary search All elements before the required element have the first occurrence at even index and next occurrence at odd index. 
All elements after the required element have the first occurrence at odd index and next occurrence at even index. 
We can use this fact to find the desired answer by update the low and high pointer in binary search accordingly.
*/

class Solution {
    findOnce(arr) {
        const n = arr.length
        let l = 0, r = n - 1
        
        while (l < r) {
            const mid = l + Math.floor((r - l)/2)
            
            if (mid % 2 === 0) {
                if (arr[mid] !== arr[mid + 1]) {
                    r = mid // mid also could be the ans
                } else {
                    l = mid + 1
                }
            } else {
                if (arr[mid] !== arr[mid - 1]) {
                    r = mid - 1
                } else {
                    l = mid + 1
                }
            }
        }
        
        return arr[l]
    }
}
