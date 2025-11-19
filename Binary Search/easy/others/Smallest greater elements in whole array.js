// https://www.geeksforgeeks.org/smallest-greater-elements-in-whole-array/


// O(nlogn) & O(1)

const upperBound = (arr, target) => {
    let l = 0, r = arr.length - 1, mid
    
    while (l <= r) {
        mid = l + Math.floor((r - l)/2)
        
        if (arr[mid] > target) {
            r = mid - 1
        } else {
            l = mid + 1
        }
    }
    
    return l
}

class Solution {
    // Function to find the next greater element for each element of the array.
    greaterElement(arr, n) {
        // your code here
        const res = []
        const sortedArr = Array.from(new Set(arr)).sort((a, b) => a - b)
        const len = sortedArr.length
        for (let num of arr) {
            const idx = upperBound(sortedArr, num)
            if (idx >= len) res.push(-10000000)
            else res.push(sortedArr[idx])
        }
        
        return res
    }
}
