// https://leetcode.com/problems/maximum-points-you-can-obtain-from-cards/description/

/*

O(2k) & O(1)

*/

/*

We need to get max points, so we first add k cardPoints from the left and then try to reduce the sum from the left and add from the right and see taking which cards gives the max points.

*/

var maxScore = function (cardPoints, k) {
  const n = cardPoints.length;
  let lSum = 0,
    rSum = 0,
    maxSum = 0,
    rIndex = n - 1;

  for (let i = 0; i < k; i++) {
    lSum += cardPoints[i];
  }

  if (k === n) return lSum; // if k === n, we can take all the cards
  maxSum = lSum;

  for (let i = k - 1; i >= 0; i--) {
    lSum -= cardPoints[i]; // keep removing from the left
    rSum += cardPoints[rIndex]; // keep adding from the end
    rIndex--;
    maxSum = Math.max(maxSum, lSum + rSum); // find which is the max sum
  }

  return maxSum;
};


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
