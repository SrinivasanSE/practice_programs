// https://leetcode.com/problems/max-consecutive-ones-iii/description/


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
    }

    return right - start // now right will be equal to n, so we don't need to add +1 to the result
};