// https://www.geeksforgeeks.org/problems/index-of-an-extra-element/1?page=1&category=Searching&difficulty=Easy&sortBy=submissions

/*
To find the index of the missing element in less than linear time, binary search can be used, 
the idea is all the indices greater than or equal to the index of the missing element will have different elements in both the arrays 
and all the indices less than that index will have the similar elements in both arrays.
*/

class Solution {
    findExtra(a, b) {
        const n = Math.max(a.length, b.length)
        let l = 0, r = n - 1, ans = n
        
        while (l <= r) {
            
            const mid = l + Math.floor(( r- l)/2)
            
            if (a[mid] != b[mid]) {
                ans = mid
                r = mid - 1
            } else {
                l = mid + 1
            }
        }
        
        return ans
    }
}
