// https://www.geeksforgeeks.org/number-subarrays-maximum-value-given-range/

/*

Brute

O(n^2) & O(1)

*/

class Solution {
  // Complete the function countSubarrays here
  countSubarrays(a, n, L, R) {
    // your code here
    let high,
      count = 0;

    for (let i = 0; i < n; i++) {
      high = -Infinity;

      for (let j = i; j < n; j++) {
        high = Math.max(high, a[j]);
        if (high >= L && high <= R) {
          count++;
        }
      }
    }

    return count;
  }
}

/*

Better - Sliding window

O(n) & O(1)

*/

class Solution {
  count(arr, ele) {
    let start = 0;
    let c = 0;

    for (let end = 0; end < arr.length; end++) {
      if (arr[end] > ele) {
        // if the current element is greater than the max ele allowed, move the start
        start = end + 1;
      } else {
        c += end - start + 1;
      }
    }

    return c;
  }

  countSubarrays(a, n, L, R) {
    return this.count(a, R) - this.count(a, L - 1); // subtracting count of subarrays which have max element below given l from given r will give us the count
  }
}

/*

Optimal - Two Pointer

O(n) & O(1)

*/

class Solution {
  countSubarrays(arr, n, L, R) {
    let lastValid = -1,
      lastInvalid = -1,
      count = 0;

    for (let i = 0; i < n; i++) {
      // If arr[i] is out of range,
      // reset lastValid
      if (arr[i] > R) {
        lastInvalid = i;
        lastValid = -1;
      }

      // If arr[i] is within range,
      // update lastValid
      if (arr[i] >= L && arr[i] <= R) {
        lastValid = i;
      }

      // Add valid subarrays ending at index i
      if (lastValid != -1) {
        count += lastValid - lastInvalid;
      }
    }

    return count;
  }
}
