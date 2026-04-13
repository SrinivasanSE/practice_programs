# We use pick and not pick approach

## pick || notPick

1) Subset Sum equal to target

- The func takes two params, i and target.
- We start the recursion from n - 1 and target as sum.
- Base condition:
    if t < 0 return false
    if t == 0 return true
    if i == 0 return t == arr[i]
- Use pick and not pick approach. NotPick - dp[i - 1][t] Pick - dp[i - 1][t - arr[i]]
- For tabulation, we run the for loop from i = 1 to n and target from 0 to sum.
- For space ops using 1DP, we can just run the target from sum to arr[i] in reverse to use only single arr.
- If dp[sum] becomes true at any point, return there itself.

2) Partition equal subset sum

- We need to find the sum of the elements in the arr, if the target is odd, it's not possible to partition, so return false.
- We can use the same above logic as in #1 and the target will be sum / 2

3) Minimum Sum Partition

- We need to find the sum of the elements which will be the target.
- We need to find the minPossibleClosest sum. We use the same logic as #1 and run a for loop from target/2 to 0, if the dp[i] is true, that means
    this sum is possible.
- We need to return s2 - s1, where s1 = min, s2 = total - min, which is total - 2 * min.

## pick + notPick

4) Count Subsets with Sum K

- The func takes two params, i and target.
- We start the recursion from n - 1 and target as sum.
- Base Condition
    if (i == 0) 
        if (t == 0 && arr[i] == 0) return 2
        if (t == 0 || arr[i] == t) return 1
        return 0
- Use pick and not pick approach. NotPick - dp[i - 1][t] Pick - dp[i - 1][t - arr[i]]
- For tabulation, we run the for loop from i = 1 to n and target from 0 to sum.
- For space ops using 1DP, we can just run the target from sum to arr[i] in reverse to use only single arr.


5) Count Partitions with Given Difference

- The target will be (totalSum - d) / 2.
- totalSum - d < 0 and totalSum - d should be even
- Use the same #4 logic

## Math.max(pick, notPick)

6) 0 - 1 Knapsack

- Similar to count approach, the target is weight here
- We start the recursion from n - 1 and target as W
- Base Condition
    if (i == 0)
        if (w >= wt[i]) return val[i]
        return 0
- Use pick and not pick approach. NotPick - dp[i - 1][w] Pick - val[i] + dp[i - 1][w - wt[i]]
- For tabulation, we run the for loop from i = 1 to n and target from 0 to W.
- For space ops using 1DP, we can just run the target from W to wt[i] in reverse to use only single arr.
