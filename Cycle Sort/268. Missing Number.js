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



// Using cycle sort since the range is from [0/1 to n]


var missingNumber = function(nums) { // this is for 0 to n
    const n = nums.length
    
    let i = 0

    while (i < n) {
        let correctIndex = nums[i]
        if (nums[i] < n && nums[i] != nums[correctIndex]) { // if it's not at the right place, swap it, for ex: [3,0,1], i = 1 and value is 0, 
        // so 0 should be at 0 index, nums[1] != nums[0], so we swap it
            [nums[i], nums[correctIndex]] = [nums[correctIndex], nums[i]]
        } else { // if it's at the right place, move i
            i++
        }
    }

    for (let i = 0; i < n; i++) { // now the array is sorted, so just check if the elements are at the right index
        if (i != nums[i]) return i
    }

    return n
};
