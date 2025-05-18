// https://www.geeksforgeeks.org/problems/maximum-point-you-can-obtain-from-cards/1?page=1&category=sliding-window&difficulty=Medium&status=unsolved&sortBy=submissions
// https://www.geeksforgeeks.org/find-maximum-minimum-sum-subarray-size-k/


/*
Let n be the total number of cards.

You must take k cards from either end → That means you're leaving behind a subarray of length n - k in the middle.

The maximum score = total sum of all cards − minimum sum of any subarray of length n - k

*/

class Solution {
    // Helper function to find minimum sum of any subarray of length k
    getMinSubarraySum(arr, k) {
        let minSum = 0;
        for (let i = 0; i < k; i++) {
            minSum += arr[i];
        }

        let currSum = minSum;
        for (let i = k; i < arr.length; i++) {
            currSum += arr[i] - arr[i - k];
            minSum = Math.min(minSum, currSum);
        }

        return minSum;
    }

    // Main function to get max score by taking k cards from either end
    maxScore(arr, k) {
        const totalSum = arr.reduce((acc, curr) => acc + curr, 0);
        const n = arr.length;

        // If we're taking all elements
        if (k === n) return totalSum;

        const minSubarrayLength = n - k;
        const minSubSum = this.getMinSubarraySum(arr, minSubarrayLength);
        return totalSum - minSubSum;
    }
}
