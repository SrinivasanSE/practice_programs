// https://leetcode.com/problems/remove-duplicates-from-sorted-array/description/

/*
Brute - using hashmap
O(n) & O(n)

*/

var removeDuplicates = function(nums) {
    const set = new Set()

    for(let num of nums) {
        set.add(num)
    }
    let i = 0
    for(let key of set) {
        nums[i] = key
        i++
    }

    return i
};


/*
Optimal 
O(n) & O(1)

*/

var removeDuplicates = function(nums) {
    let i = 0
    const n = nums.length
    for(let j = 1; j < n; j++) { // keep moving j and if we find an element which is not same as arr[i], update it
        if (nums[i] !== nums[j]) {
            nums[++i] = nums[j]
        }
    }
    return i + 1 // we are returning i + 1, because i denotes the index, but we need to return the number of unique elements
    
};