// https://leetcode.com/problems/check-if-array-is-sorted-and-rotated/description/


/*
Brute
O(n^2) & O(n)

*/

var check = function(arr) {
    const n = arr.length

    const sorted = [...arr]
    sorted.sort((a, b) => a - b)
    let isMatch
    for(let rotation = 0; rotation < n; rotation++) {
        isMatch = true
        for(let i = 0; i < n; i++) {
            if (arr[(rotation + i) % n] != sorted[i]) { // check if the given input rotated array pos matches with the sorted arr
                isMatch = false
                break 
            }
        }

        if (isMatch) {
            return true
        }
    }

    return false
};


/*
Optimal
O(n) & O(1)

// Non decreasing means, the array is sorted in ascending order and it won't decrease going forward, but the elements could be same
// In a sorted and rotated array, there will be at most one place where the order decreases (i.e., where a larger element is followed by a smaller one).

*/


var check = function(arr) {
    const n = arr.length

    if (n <= 1) return true
    let drops = 0

    for(let i = 0; i < n; i++) {
        if (arr[i] > arr[(i + 1) % n]) { // this check the last and first element as well, n = 6, i = 5, arr[5] > arr[0]
            drops++
        }

        if (drops > 1) return false
    }

    return drops <= 1
};