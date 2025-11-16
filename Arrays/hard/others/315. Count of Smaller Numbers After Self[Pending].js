// https://leetcode.com/problems/count-of-smaller-numbers-after-self/description/

// Explore other solutions


// Similar to count inversions problem

/*

Optimal - Merge sort

O(nlogn) *& O(n)

*/

var countSmaller = function(nums) {
    const n = nums.length

    // This will store the final answer: counts[i] = numbers smaller to the right of nums[i]
    const result = new Array(n).fill(0)

    // Convert nums into array of [value, originalIndex]
    // We must preserve original positions because merge sort reorders elements
    const arr = nums.map((num, i) => [num, i])

    // Apply merge sort with counting
    mergeSort(arr, 0, n - 1, result)

    return result
};


// Standard merge sort (divide part)
const mergeSort = (nums, l, r, res) => {
    
    // 1 element → already sorted
    if (l >= r) return

    const mid = l + Math.floor((r - l) / 2)

    // Sort left half
    mergeSort(nums, l, mid, res)

    // Sort right half
    mergeSort(nums, mid + 1, r, res)

    // Merge two sorted halves AND count smaller elements to the right
    merge(nums, l, mid, r, res)
}


const merge = (nums, l, mid, r, res) => {
    let left = l               // pointer for left half
    let right = mid + 1        // pointer for right half

    const temp = new Array(r - l + 1)  // temporary merged array

    let countSmaller = 0       // Count how many right-side elements are smaller
    let k = 0                  // pointer for temp array

    // Merge the two halves while counting
    while (left <= mid && right <= r) {

        // If left value ≤ right value, then no new smaller elements from right
        if (nums[left][0] <= nums[right][0]) {
            // left element gets all smaller-rights counted so far
            res[nums[left][1]] += countSmaller

            temp[k] = nums[left++]
        } 
        else {
            // right element is smaller → contributes to counts
            countSmaller++

            temp[k] = nums[right++]
        }
        k++
    }

    // If any left elements remain:
    // All remaining contribute `countSmaller` smaller numbers from right half
    while (left <= mid) {
        res[nums[left][1]] += countSmaller
        temp[k++] = nums[left++]
    }

    // Remaining right elements: no contribution to counts, just copy them
    while (right <= r) {
        temp[k++] = nums[right++]
    }

    // Copy back merged result into original array
    for (let i = l; i <= r; i++) {
        nums[i] = temp[i - l]
    }
}
