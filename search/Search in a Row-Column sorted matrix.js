// https://www.geeksforgeeks.org/problems/search-in-a-matrix17201720/1?page=1&category=Searching&difficulty=Easy&sortBy=submissions

/*

The idea is to remove a row or column in each comparison until an element is found. Start searching from the top-right corner of the matrix. There are 3 possible cases:

x is greater than the current element: This ensures that all the elements in the current row are smaller than the given number as the pointer is already at the right-most element and the row is sorted. Thus, the entire row gets eliminated and continues the search from the next row.
x is smaller than the current element: This ensures that all the elements in the current column are greater than the given number. Thus, the entire column gets eliminated and continues the search from the previous column, i.e. the column on the immediate left.
The given number is equal to the current number: This will end the search.

*/


class Solution {

    matSearch(arr, x) {
        const n = arr.length
        const m = arr[0].length
        let l = 0, r = m - 1
        
        while (l < n && r >= 0) {
            if (arr[l][r] === x) {
                return true
            }
            if(arr[l][r] < x) {
                l++
            } else {
                r--
            }
        }
        
        return false
    }
}
