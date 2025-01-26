// https://www.geeksforgeeks.org/search-element-sorted-matrix/


binarySearch(arr, l, r, target) {
        while(l <= r) {
            const mid = l + Math.floor((r - l)/2)
            
            if (arr[mid] === target) {
                return true
            }
            if (arr[mid] < target) {
                l = mid + 1
            } else {
                r = mid - 1
            }
        }
        
        return false
    }
    searchMatrix(arr, target) {
        // code here
        const n = arr.length
        const m = arr[0].length
        
        let l = 0
        let r = n - 1
        let index = -1
        
        while (l <= r) {
            const mid = l + Math.floor((r - l)/2)
            
            if (arr[mid][0] === target) {
                return true
            }
            
            if (arr[mid][0] < target) {
                index = mid
                l = mid + 1
            } else {
               r = mid - 1
            }
            
            
        }
        
        if (index === -1) {
            return false
        }
        
        return this.binarySearch(arr[index], 0, m - 1, target)
    }

/*

The idea is to consider the given matrix as 1D array and apply only one binary search. For example, for a matrix of size n x m and we can consider it as a 1D array of size n*m, then the first index would be 0 and last index would n*m-1. So, we need to do binary search from low = 0 to high = (n*m-1).


How to find the element in 2D matrix corresponding to index = mid?


Since each row of mat[][] will have m elements, so we can find the row of the element as (mid / m) and the column of the element as (mid % m). Then, we can compare x with arr[mid/m][mid%m] for each mid and complete our binary search.

*/


searchMatrix(arr, target) {
        // code here
        const n = arr.length
        const m = arr[0].length
        
        let l = 0
        let r = n*m - 1
        
        while (l <= r) {
            const mid = l + Math.floor((r - l)/2)
            const row = Math.floor(mid/m)
            const col = mid%m
            if (arr[row][col] === target) {
                return true
            }
            
            if (arr[row][col] < target) {
                l = mid + 1
            } else {
               r = mid - 1
            }
            
            
        }
        
       return false
    }
