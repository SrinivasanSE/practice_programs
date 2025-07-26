// https://leetcode.com/problems/search-a-2d-matrix/description/


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
Better
O(n) + O(log(m)) - Because the binary search only runs once, so it's not O(n*log(m))
& O(1)

*/

const binarySearch = (arr, target) => {
    const n = arr.length
    let l = 0, r = n - 1

    while (l <= r) {
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
var searchMatrix = function(matrix, target) {
    const n = matrix.length
    const m = matrix[0].length

    for(let i = 0; i < n; i++) {
        if (matrix[i][0] <= target && matrix[i][m - 1] >= target) {
            return binarySearch(matrix[i], target)
        }
    }

    return false
};

/*
Optimal
O(log(n*m)) & O(1)

*/


var searchMatrix = function(matrix, target) {
    const n = matrix.length
    const m = matrix[0].length

   let l = 0, r = n*m - 1 // we flat the array and consider it as 1d arr

   while (l <= r) {
    const mid = l + Math.floor((r - l)/2)
    const row = Math.floor(mid / m), col = mid % m // derive row and col index
    if (matrix[row][col] === target) {
        return true
    }

    if (matrix[row][col] < target) {
        l = mid + 1
    } else {
        r = mid - 1
    }
   }

    return false
};