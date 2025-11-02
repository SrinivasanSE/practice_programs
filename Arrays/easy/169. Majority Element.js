// https://www.geeksforgeeks.org/boyer-moore-majority-voting-algorithm/
// https://www.geeksforgeeks.org/majority-element/
// https://www.geeksforgeeks.org/boyer-moore-majority-voting-algorithm/
// https://leetcode.com/problems/majority-element


/* 
Brute - Use two loops and check the count
O(N^2) & O(1)
*/


/*
Better - Use hashmap
O(N) & O(N)
*/

var majorityElement = function(nums) {
    const map = new Map()
    const n = nums.length
    for(let i = 0; i < n; i++) {
        map.set(nums[i], (map.get(nums[i]) || 0) + 1)
        if (map.get(nums[i]) > Math.floor(n/2)) {
            return nums[i]
        }
    }
};

/*
Optimal - Use Moore's Voting Algo

O(n) & O(1)

*/


var majorityElement = function(nums) {
    const n = nums.length
    let count = 0, candidate

    for(let num of nums) {
        if (count === 0) { // if the count becomes 0, it can't be the majority element
            count = 1
            candidate = num
        } else if (candidate === num) {
            count++
        } else {
            count--
        }
    }
    // NOTE: we can directly return the candidate here, if the majority element will be there for sure
    
    // After this, the candidate is the major repeating element, but it might be not be occuring more than N/2, so we verify
    count = 0
    for(let num of nums ) {
        if (num === candidate) {
            count++
        }
    }

    if (count > Math.floor(n/2)) {
        return candidate
    }

    return -1
};
