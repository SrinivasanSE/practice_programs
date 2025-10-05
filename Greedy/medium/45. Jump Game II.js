// https://www.geeksforgeeks.org/minimum-number-of-jumps-to-reach-end-of-a-given-array/
// https://leetcode.com/problems/jump-game-ii/description/


/*

Brute - Recursion
O(2^N) * O(N)

*/

var jump = function(nums) {
    return findJumps(nums, 0, 0)
};

const findJumps = (nums, idx, jumps) => {
    if (idx >= nums.length - 1) {
        return jumps
    }
    let min = Number.MAX_SAFE_INTEGER
    for (let i = 1; i <= nums[idx]; i++) { // i should start from 1 and not 0
        min = Math.min(min, findJumps(nums, idx + i, jumps + 1)) // jump to each place and calc min
    }

    return min
}

/*

Better - DP

*/

// Check dp approaches for this


/*

Optimal - Greedy
O(n) & O(1)

*/

class Solution {
    minJumps(arr) {
        // code here
        const n = arr.length
        if (n <= 1) {
            return 0
        }
        if (arr[0] === 0) {
            return -1
        }
        let jumps = 0, currentEnd = 0, farthest = 0
        for (let i = 0; i < n - 1; i++) {
            farthest = Math.max(farthest, i + arr[i]) // The farthest index reachable so far
            if (i === currentEnd) { // We’ve used one jump to reach all possible indices up to currentEnd
                 if (i === farthest) { // if both are equal, that means we can't go from here to the next
                    return -1
                }
                jumps++
                currentEnd = farthest // extend the range to farthest
                
            }
            
            if (currentEnd >= n - 1) { // we can reach the end
                return jumps
            }
        }
        
        return -1
    }
}
