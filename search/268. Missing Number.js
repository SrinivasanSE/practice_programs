// https://www.geeksforgeeks.org/find-the-missing-number/
// https://leetcode.com/problems/missing-number/description/


var missingNumber = function(nums) {
    nums.sort((a, b) => a - b);
    const n = nums.length;
    
    // Case 1
    if (nums[0] !== 0) return 0;
    
    // Case 2
    if (nums[n - 1] !== n) return n;
    
    // Case 3
    for (let i = 1; i < nums.length; i++) {
        if (nums[i] !== i) return i;
    }
    
    return 0;
};



function missingNumber(arr) {
        const n = arr.length + 1
        const hashArr = new Array(n).fill(0)
        for(let i = 0; i < n - 1; i++) {
            hashArr[arr[i] - 1]++
        }
        for(let i = 0 ; i < n; i++) {
            if (hashArr[i] === 0 ) {
                return i + 1
            }
        }
    }


class Solution {
    // Function to find the missing number in the array.
    missingNumber(arr) {
        const n = arr.length + 1
        const sum = arr.reduce((accum, curr) => accum + curr, 0)
        const expectedSum = (n*(n+1))/2
        return expectedSum - sum
    }
}



var missingNumber = function(nums) {
    const n = nums.length
    let xor1 = 0
    let xor2 = 0

    for(let i = 0; i < n; i++) {
        xor1 ^= nums[i]
        xor2 ^= (i + 1)
    }

    return xor1 ^ xor2
};





