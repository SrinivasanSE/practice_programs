// https://takeuforward.org/data-structure/dynamic-programming-frog-jump-with-k-distances-dp-4/

/*

Recursion

O(k^n) & O(n)

*/

function frogJumpRecursive(n, heights, k) {
  if (n === 0) return 0; // base case

  let minEnergy = Infinity;
  for (let j = 1; j <= k; j++) {
    // use for loop to find for i + 1, i + 2, .. i + k distance
    if (n - j >= 0) {
      const jump =
        frogJumpRecursive(n - j, heights, k) +
        Math.abs(heights[n] - heights[n - j]);
      minEnergy = Math.min(minEnergy, jump);
    }
  }

  return minEnergy;
}

/*

Memoization approach

O(n*k) & O(n)

*/

function frogJumpMemo(n, heights, k, dp = {}) {
  if (n === 0) return 0;
  if (dp[n] !== undefined) return dp[n];

  let minEnergy = Infinity;
  for (let j = 1; j <= k; j++) {
    if (n - j >= 0) {
      const jump =
        frogJumpMemo(n - j, heights, k, dp) +
        Math.abs(heights[n] - heights[n - j]);
      minEnergy = Math.min(minEnergy, jump);
    }
  }

  return (dp[n] = minEnergy);
}

/*

Tabulation

O(n*k) & O(n)

*/

function frogJumpDP(heights, k) {
  const n = heights.length;
  const dp = new Array(n).fill(0);

  for (let i = 1; i < n; i++) {
    let minEnergy = Infinity;
    for (let j = 1; j <= k; j++) {
      if (i - j >= 0) {
        const jump = dp[i - j] + Math.abs(heights[i] - heights[i - j]);
        minEnergy = Math.min(minEnergy, jump);
      }
    }
    dp[i] = minEnergy;
  }

  return dp[n - 1];
}

/*

Space optimised

O(n*k) & O(k)
*/

function frogJumpSpaceEfficient(heights, k) {
  const n = heights.length;
  const dp = Array(k).fill(0); // store last k results

  for (let i = 1; i < n; i++) {
    let minEnergy = Infinity;

    for (let j = 1; j <= k && i - j >= 0; j++) {
      const prevIdx = (i - j) % k;
      const jump = dp[prevIdx] + Math.abs(heights[i] - heights[i - j]);
      minEnergy = Math.min(minEnergy, jump);
    }

    dp[i % k] = minEnergy; // overwrite oldest entry
  }

  return dp[(n - 1) % k];
}
