// https://www.geeksforgeeks.org/find-maximum-minimum-sum-subarray-size-k/

/*

Brute

O(n^2) & O(1)

*/

class Solution {
  maximumSumSubarray(arr, k) {
    // code here
    let sum;
    const n = arr.length;
    let maxSum = 0;
    for (let i = 0; i <= n - k; i++) {
      sum = 0;
      for (let j = i; j < i + k; j++) {
        sum += arr[j];
      }
      maxSum = Math.max(sum, maxSum);
    }

    return maxSum;
  }
}

/*

Better

O(n) & O(n)

*/

class Solution {
  maxSubarraySum(arr, k) {
    // code here
    const n = arr.length;
    let maxSum = 0,
      sum = 0;
    const prefixSum = new Array(n + 1).fill(0);
    for (let i = 1; i <= n; i++) {
      prefixSum[i] = prefixSum[i - 1] + arr[i - 1];
    }
    for (let i = 0; i < n - k + 1; i++) {
      sum = prefixSum[i + k] - prefixSum[i];
      maxSum = Math.max(sum, maxSum);
    }
    return maxSum;
  }
}

/*

Optimal

O(n) & O(1)

*/

class Solution {
  maximumSumSubarray(arr, k) {
    // code here
    let sum = 0;
    const n = arr.length;
    for (let i = 0; i < k; i++) {
      sum += arr[i];
    }

    let maxSum = sum;

    for (let i = k; i < n; i++) {
      sum -= arr[i - k];
      sum += arr[i];
      maxSum = Math.max(sum, maxSum);
    }

    return maxSum;
  }
}
