// https://www.geeksforgeeks.org/dsa/remove-minimum-coins-such-that-absolute-difference-between-any-two-piles-is-less-than-k/

/*

Binary Search & Prefix sum

O(nlogn) & O(n)

*/

class Solution {
  minimumCoins(arr, k) {
    // Sort the piles so we can reason in increasing order
    // This allows us to remove all smaller piles and trim larger ones efficiently
    arr.sort((a, b) => a - b);

    const n = arr.length;

    // prefix[i] will store the sum of the first i piles
    // prefix[0] = 0 (no piles)
    // prefix[1] = arr[0]
    // prefix[n] = sum of all piles
    let prefix = new Array(n + 1).fill(0);

    // Build prefix sum array
    for (let i = 1; i <= n; i++) {
      prefix[i] = prefix[i - 1] + arr[i - 1];
    }

    // Worst case: remove all coins
    let minCoins = prefix[n];
    let j;

    // Try each pile as the minimum allowed pile
    for (let i = 0; i < n; i++) {
      // We allow all piles to be in the range:
      // [arr[i], arr[i] + k]
      // Find the first index j such that arr[j] > arr[i] + k
      // All piles from j to n-1 are too large and must be trimmed
      j = this.upperBound(arr, arr[i] + k);

      /*
                Coins to remove consists of two parts:

                1) Remove all piles smaller than arr[i]
                   These are piles from index 0 to i-1
                   prefix[i] gives their total coins

                2) Trim piles larger than arr[i] + k
                   Piles from j to n-1 are too large

                   Current coins in large piles:
                   prefix[n] - prefix[j]

                   Allowed coins after trimming:
                   (n - j) * (arr[i] + k)

                   Extra coins to remove:
                   (prefix[n] - prefix[j]) - (n - j) * (arr[i] + k)
            */
      let coinsRemoved =
        prefix[i] + (prefix[n] - prefix[j] - (n - j) * (arr[i] + k));

      // Update minimum coins removed so far
      minCoins = Math.min(minCoins, coinsRemoved);
    }

    return minCoins;
  }

  // upperBound returns the first index where arr[index] > target
  // This is standard binary search
  upperBound(arr, target) {
    let l = 0;
    let r = arr.length - 1;

    while (l <= r) {
      const mid = l + Math.floor((r - l) / 2);

      if (arr[mid] <= target) {
        // mid is valid, search right side
        l = mid + 1;
      } else {
        // mid is too large, search left side
        r = mid - 1;
      }
    }

    // l is the first index where arr[l] > target
    return l;
  }
}

/*

Two pointers

O(nlogn) & O(1)

*/

class Solution {
  minimumCoins(arr, k) {
    // Step 1: Sort the piles so differences can be checked easily
    arr.sort((a, b) => a - b);

    const n = arr.length;

    // prefix = sum of piles before the current window (index < start)
    let prefix = 0;

    // total sum of all coins
    const total = arr.reduce((sum, val) => sum + val, 0);

    // Worst case: remove all coins
    let minCoins = total;

    // Sliding window pointers
    let end = 0;

    // Sum of elements inside current window [start, end)
    let windowSum = 0;

    // Move start from 0 to n-1
    for (let start = 0; start < n; start++) {
      /*
                Expand the window as much as possible.
                Condition:
                arr[end] - arr[start] <= k
                → all piles in window differ by at most k
            */
      while (end < n && arr[end] - arr[start] <= k) {
        windowSum += arr[end]; // include arr[end] in window
        end++;
      }

      /*
                Coins to remove consists of:

                1) Remove all piles BEFORE the window
                   → prefix already stores their sum

                2) Piles AFTER the window must be trimmed
                   Current sum of those piles:
                   total - prefix - windowSum

                   Allowed max value for each:
                   arr[start] + k

                   Excess coins to remove:
                   (total - prefix - windowSum)
                   - (n - end) * (arr[start] + k)
            */
      let removed =
        prefix + (total - prefix - windowSum - (n - end) * (arr[start] + k));

      // Update minimum coins removed
      minCoins = Math.min(minCoins, removed);

      /*
                Now move the window forward:

                Case 1: start === end
                → window is empty
                → nothing to remove from window
                → move end forward to avoid infinite loop

                Case 2: start < end
                → arr[start] is leaving the window
                → subtract it from windowSum
            */
      if (start === end) {
        end++;
      } else {
        windowSum -= arr[start];
      }

      // Add arr[start] to prefix because it is now before the window
      prefix += arr[start];
    }

    return minCoins;
  }
}
