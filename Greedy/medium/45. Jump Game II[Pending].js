// https://www.geeksforgeeks.org/minimum-number-of-jumps-to-reach-end-of-a-given-array/
// https://leetcode.com/problems/jump-game-ii/description/


/*

Brute - Recursion
O(N^N) * O(N)

*/

var jump = function(nums) {
    // Start recursion from index 0 with 0 jumps taken
    return findJumps(nums, 0, 0)
};

const findJumps = (nums, idx, jumps) => {

    // BASE CASE:
    // If we have reached or crossed the last index,
    // no more jumps are needed.
    // Return the number of jumps taken so far.
    if (idx >= nums.length - 1) {
        return jumps
    }

    // This variable will store the minimum jumps
    // needed to reach the end from the current index
    let min = Number.MAX_SAFE_INTEGER

    // Try all possible jumps from the current index
    // We can jump from 1 step up to nums[idx] steps
    for (let i = 1; i <= nums[idx]; i++) {

        // Recursively calculate jumps needed if we jump
        // from idx to idx + i
        // - idx + i : new position
        // - jumps + 1 : one jump used
        const curr = findJumps(nums, idx + i, jumps + 1)

        // Keep the minimum jumps among all possible paths
        min = Math.min(min, curr)
    }

    // Return the minimum jumps required from this index
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
        for (let i = 0; i < n - 1; i++) { // running upto n - 1 is enough as we don't have to do any jumps from last index
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
