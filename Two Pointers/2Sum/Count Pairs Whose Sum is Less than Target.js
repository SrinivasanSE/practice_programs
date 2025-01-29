// https://leetcode.com/problems/count-pairs-whose-sum-is-less-than-target/

var countPairs = function(nums, target) {
    let count = 0
    nums.sort((a, b) => a - b)
    const n = nums.length
    let i = 0, j = n - 1
    while (i < j) {
        let sum = nums[i] + nums[j]
        if (sum < target) {
            count += (j - i) // if the element at i and j is less than the target, then for ex, index 0, 4. 0 + 4, 0 + 3, 0 + 2, 0 + 1 will also be less than the target
            i++
        }
        else {
            j--
        }
    }

    return count
};


https://www.geeksforgeeks.org/problems/valid-pair-sum--141631/1?page=1&category=Searching&difficulty=Medium&sortBy=submissions

ValidPair(arr,n){
        
        //code here
        let count = 0
        arr.sort((a, b) => a - b)
        let l = 0, r = n - 1
        //console.log(arr)
        while (l < r) {
            const sum = arr[l] + arr[r]
            if (sum > 0) {
                count += (r - l)
                r--
            } else {
                l++
            }
        }
        
        return count
        
    }
