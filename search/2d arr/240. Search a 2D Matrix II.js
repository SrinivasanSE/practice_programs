// https://www.geeksforgeeks.org/problems/search-in-a-matrix17201720/1?page=1&category=Searching&difficulty=Easy&sortBy=submissions
// https://leetcode.com/problems/search-a-2d-matrix-ii/description/

/*

The idea is to remove a row or column in each comparison until an element is found. Start searching from the top-right corner of the matrix. There are 3 possible cases:

x is greater than the current element: This ensures that all the elements in the current row are smaller than the given number as the pointer is already at the right-most element and the row is sorted. Thus, the entire row gets eliminated and continues the search from the next row.
x is smaller than the current element: This ensures that all the elements in the current column are greater than the given number. Thus, the entire column gets eliminated and continues the search from the previous column, i.e. the column on the immediate left.
The given number is equal to the current number: This will end the search.

*/

/*
Brute
O(n*m) & O(1)

*/

function searchMatrix(matrix, target) {
    const n = matrix.length;
    const m = matrix[0].length;

    // traverse the matrix:
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < m; j++) {
            if (matrix[i][j] === target)
                return true;
        }
    }
    return false;
}

/*
Better - Binary Search
O(nlog(m)) & O(1)
*/

const binarySearch = (arr, target) => {
    let l = 0, r = arr.length - 1

    while (l <= r) {
        const mid = l + Math.floor((r - l)/2)
        if (arr[mid] === target) {
            return mid
        }

        if (arr[mid] < target ){
            l = mid + 1
        } else {
            r = mid - 1
        }
    }

    return -1
}
var searchMatrix = function (matrix, target) {
    const n = matrix.length
    const m = matrix[0].length

    for(let i = 0; i < n; i++) {
        const idx = binarySearch(matrix[i], target)
        if (idx != -1) {
            return true
        }
    }
    return false
};

/*
Optimal
O(N + M) & O(1)

*/

// first row, last column
class Solution {

    matSearch(arr, x) { // here first row, last column is considered, last row and first column can be considered
        const n = arr.length
        const m = arr[0].length
        let r = 0, c = m - 1
        
        while (r < n && c >= 0) {
            if (arr[r][c] === x) {
                return true
            }
            if(arr[r][c] < x) {
                r++
            } else {
                c--
            }
        }
        
        return false
    }
}

// last row, first column
var searchMatrix = function(matrix, target) {
     const n = matrix.length
    const m = matrix[0].length

    let r = n - 1, c = 0

    while (r >= 0 && c < m) {
        if (matrix[r][c] === target) return true

        if (matrix[r][c] < target) {
            c++
        } else {
            r--
        }
    }

    return false
};

/*
Case 1: N = 1000, M = 1000

O(N*LogM) ≈ 1000 * 10 = 10,000
O(N + M) = 2000

Case 2: N = 1000, M = 1,000,000

O(N*LogM) ≈ 1000 * 20 = 20,000
O(N + M) = 1,001,000

In this case, for very large M and small N, O(N*LogM) can be better, but as N and M both grow, O(N + M) is usually preferable.

*/