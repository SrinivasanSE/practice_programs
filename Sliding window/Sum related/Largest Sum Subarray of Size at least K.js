// https://www.geeksforgeeks.org/largest-sum-subarray-least-k-numbers/

/*

Brute

O(n^2) & O(1)

*/

class Solution {
  // Function to find maximum sum subarray by removing at most k elements.
  maxSumWithK(arr, n, k) {
    // your code here
    let res = -Infinity;

    for (let i = 0; i <= n - k; i++) { // upto n - k
      let currSum = 0;
      for (let j = i; j < n; j++) { // upto n
        currSum += arr[j];
        if (j - i >= k - 1) {
          res = Math.max(res, currSum);
        }
      }
    }

    return res;
  }
}

/*

Better

O(n) & O(n)

*/

class Solution {
  maxSumWithK(arr, n, k) {
    // your code here
    let maxPrefixSum = new Array(n).fill(0),
      currMax;
    currMax = maxPrefixSum[0] = arr[0];

    for (let i = 1; i < n; i++) { // Max subarr sum using Kadane's algo
      maxPrefixSum[i] = Math.max(maxPrefixSum[i - 1] + arr[i], arr[i]);
    }

    let currSum = 0;
    for (let i = 0; i < k; i++) {
      currSum += arr[i];
    }
    let res = currSum;
    for (let i = k; i < n; i++) {
      currSum = currSum + arr[i] - arr[i - k]; // subtract the element going out of the window to get the curr window sum

      res = Math.max(res, currSum);

      let extendedSum = currSum + maxPrefixSum[i - k]; // add the max sum achievable before that window to get larger sum if possible
      res = Math.max(res, extendedSum);
    }

    return res;
  }
}

/*

Optimal

O(n) & O(1)

*/

/*
The idea is to maintain two sliding counters - one for calculating the sum of the current k-sized window,
 and another for tracking the sum of elements before the window (like Kadane's algorithm).
  As we slide through the array, we update both sums, and whenever the sum of elements before the window becomes negative,
   we discard it since it won't contribute positively to our overall sum. 
   The maximum sum with at least k elements will either be just the k-sized window sum or the window sum plus some positive sum of elements before it.
*/

class Solution {
  // Function to find maximum sum subarray by removing at most k elements.
  maxSumWithK(arr, n, k) {
    // your code here

    let last = 0,
      j = 0;

    let sum = 0,
      res;

    for (let i = 0; i < k; i++) {
      sum += arr[i];
    }

    res = sum;

    for (let i = k; i < n; i++) {
      sum += arr[i]; // keep adding the sum

      last += arr[j++]; // keep adding the numbers before the window

      res = Math.max(res, sum);

      if (last < 0) { // if negative, subtract from the sum to see if sum becomes larger
        sum -= last;
        res = Math.max(res, sum);
        last = 0;
      }
    }

    return res;
  }
}
