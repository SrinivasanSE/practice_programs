// https://leetcode.com/problems/check-if-array-is-sorted-and-rotated/description/

// optimised
// Non decreasing means, the array is sorted in ascending order and it won't decrease going forward, but the elements could be same
// In a sorted and rotated array, there will be at most one place where the order decreases (i.e., where a larger element is followed by a smaller one).

// O(n) & O(1)
var check = function(arr) {
    let drops = 0
    const n = arr.length

    for(let i = 0; i < n - 1; i++) {
        if (arr[i] > arr[i + 1]) {
            drops++
        }
        if (drops > 1) {
            return false
        }
    }

    if (arr[n - 1] > arr[0]) { // For already sorted array
        drops++
    }

    return drops <= 1
};


// O(n^2) & O(n)
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