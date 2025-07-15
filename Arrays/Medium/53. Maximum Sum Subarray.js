// https://leetcode.com/problems/maximum-subarray/description/

// TODO - Check Divide & Conquer approach

/*
Brute Force
O(n^2) & O(1)
*/

var maxSubArray = function(nums) {
    let sum = 0
    let max = -Infinity
    const n = nums.length

    for(let i = 0; i < n; i++) {
        sum = 0
        for(let j = i; j < n; j++) {
            sum += nums[j]
            max = Math.max(max, sum)
        }
    }

    return max
};

/*
Optimal - Kandane's algo
O(n) & O(1)
*/


var maxSubArray = function(nums) {
    let sum = 0
    let max = Number.MIN_VALUE
    const n = nums.length

    for(let i = 0; i < n; i++) {
        sum += nums[i]
        max = Math.max(sum, max)
        if (sum < 0) { // if it becomes negative, there is no point in continuting with it since it won't give max sum, so we start with new subarray
            sum = 0
        }
    }
    return max
};


// If asked to return the subarray itself


function maxSubarraySum(arr, n) {
    let maxi = Number.MIN_SAFE_INTEGER; // maximum sum
    let sum = 0;

    let start = 0;
    let ansStart = -1, ansEnd = -1;
    for (let i = 0; i < n; i++) {

        if (sum == 0) start = i; // starting index

        sum += arr[i];

        if (sum > maxi) {
            maxi = sum;

            ansStart = start;
            ansEnd = i;
        }

        // If sum < 0: discard the sum calculated
        if (sum < 0) {
            sum = 0;
        }
    }

    //printing the subarray:
    console.log("The subarray is: [");
    for (let i = ansStart; i <= ansEnd; i++) {
        console.log(arr[i] + " ");
    }
    console.log("]n");

    // To consider the sum of the empty subarray
    // uncomment the following check:

    //if (maxi < 0) maxi = 0;

    return maxi;
}



