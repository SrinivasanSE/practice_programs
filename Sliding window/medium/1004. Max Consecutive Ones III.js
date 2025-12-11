// https://leetcode.com/problems/max-consecutive-ones-iii/description/

// Also can be called as Longest Subarray with atmost k zeros


/*

Better
O(2n) & O(1)

*/

var longestOnes = function(nums, k) {
    let len = 0
    const n = nums.length
    let count = 0
    let start = 0
    for (let right = 0; right < n; right++) {
        if (nums[right] === 0) {
            count++
        }

        while (count > k) {
            if (nums[start] === 0) count--
            start++
        }

        len = Math.max(len, right - start + 1)
    }

    return len
};

/*

Optimal
O(n) & O(1)

*/

var longestOnes = function(nums, k) {
   
    const n = nums.length
    let start = 0, right
    for (right = 0; right < n; right++) {
        if (nums[right] === 0) {
            k--
        }
        
        if (k < 0) { //if there are more zeros, remove the zero and move the start
            if (nums[start] === 0) { // if the start is not zero, the k will remain invalid and we keep moving the start till we find the zero and make k valid
                k+=1
            }
            start++ 
        }
        /*
        we can use this logic also to return the length, we need to calculate only when the window is valid
        if (k >= 0) {
            length = Math.max(length, right - left + 1)
        }
        */
    }
    // we keep moving l if the window is invalid, if the window is valid, left will be moved, so returning right - start will give the correct length
    return right - start // now right will be equal to n, so we don't need to add +1 to the result
};