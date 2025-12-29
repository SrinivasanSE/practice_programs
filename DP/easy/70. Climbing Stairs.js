// https://leetcode.com/problems/climbing-stairs/description/

// Same as fibonacci

/*

Brute - Recursion

O(2^n) & O(n)


*/

var climbStairs = (n) => {
  // Base case:
  // If there are 0 or 1 steps remaining,
  // there is exactly ONE way to reach the top:
  // - n = 0 → do nothing
  // - n = 1 → take one step
  if (n <= 1) {
    return 1;
  }

  /*
    Recursive case:

    To reach step `n`, the last move must be:
    1) from step (n - 1) by taking 1 step
    2) from step (n - 2) by taking 2 steps

    Total ways to reach step `n` =
    ways(n - 1) + ways(n - 2)

    This forms the Fibonacci recurrence.
  */
  return climbStairs(n - 1) + climbStairs(n - 2);
};

/*

Better - Memoization

O(n) & O(n)

*/

const climbStairs = (n) => {
  // You start at the top (the original problem) and break it down recursively.
  const dp = new Array(n + 1).fill(-1);

  const f = (n) => {
    if (n <= 1) return 1;

    if (dp[n] != -1) return dp[n];

    dp[n] = f(n - 1) + f(n - 2);
    return dp[n];
  };

  return f(n);
};

/*

Better - Tabulation

O(n) & O(1)

*/

var climbStairs = function (n) {
  const dp = new Array(n + 1).fill(-1);

  (dp[0] = 1), (dp[1] = 1);

  for (let i = 2; i <= n; i++) {
    dp[i] = dp[i - 1] + dp[i - 2];
  }

  return dp[n];
};

/*

Optimised

O(n) & O(1)

*/

var climbStairs = function (n) {
  if (n <= 1) return 1;

  let first = 1,
    second = 1,
    curr;

  for (let i = 2; i <= n; i++) {
    curr = first + second;
    second = first;
    first = curr;
  }

  return first;
};
