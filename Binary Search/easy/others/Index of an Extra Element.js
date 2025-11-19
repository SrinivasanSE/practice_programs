// https://www.geeksforgeeks.org/problems/index-of-an-extra-element/1?page=1&category=Searching&difficulty=Easy&sortBy=submissions

/*
To find the index of the missing element in less than linear time, binary search can be used, 
the idea is all the indices greater than or equal to the index of the missing element will have different elements in both the arrays 
and all the indices less than that index will have the similar elements in both arrays.
*/

class Solution {
    findExtra(a, b) {
        // code here
        const n = a.length
        let res = n - 1
        
        let l = 0, h = n - 2, mid // we need to run only from 0 to n - 2 as one element is lesser in b array, 
        // if the last element is missing in b, we will return the default value which is n - 1
        
        while (l <= h) {
            mid = l + Math.floor((h - l)/2)
            
            if (a[mid] === b[mid]) {
                l = mid + 1
            } else {
                h = mid - 1
                res = mid
            }
        }
        
        return res
    }
}
