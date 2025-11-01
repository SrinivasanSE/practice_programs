// https://www.geeksforgeeks.org/check-if-pair-with-given-sum-exists-in-array/
// https://www.geeksforgeeks.org/pair-with-given-product-set-1-find-if-any-pair-exists/
// https://leetcode.com/problems/two-sum/description/
// https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/description/

// Hashing for unsorted input
var twoSum = (arr, target) => {
        const n = arr.length
        if (n <= 1) {
            return false
        }
        const map = new Set()
        for(let i = 0; i < n; i++) {
            const expectedNum = target - arr[i]
            if (map.has(expectedNum)) {
                return true
            }
            map.add(arr[i])
        }
        
        return false
    }

// 2) Two pointer algo for sorted input
function twoSum(arr, target) {
        const n = arr.length
        if (n <= 1) {
            return false
        }
        arr.sort((a,b) => a - b) // sort if not sorted
        
        let i = 0, j = n - 1
        while (i < j) {
            const sum = arr[i] + arr[j]
            if (sum === target) {
                return true
            }
            
            if (sum < target) {
                i++
            } else {
                j--
            }
        }
        
        return false
    }


// Return indices


var twoSum = function(nums, target) {
    
    const map = new Map()
    let req
    const n = nums.length
    for(let i = 0; i < n; i++) {
        req = target - nums[i]

        if (map.has(req)) {
            return [i, map.get(req)]
        }

        map.set(nums[i], i)
    }
};


var twoSum = function(nums, target) {
    
    numsWithIndices = nums.map((num, index) => [num, index])
    numsWithIndices.sort((a, b) => a[0] - b[0])
    
    const n = nums.length
    
    let l = 0, r = n - 1, sum = 0

    while (l < r) {
        sum = numsWithIndices[l][0] + numsWithIndices[r][0]
        if (sum === target) {
            return [numsWithIndices[l][1], numsWithIndices[r][1]]
        }

        if (sum < target) {
            l++
        } else {
            r--
        }
    }
};