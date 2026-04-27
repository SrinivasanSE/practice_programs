# MCM

1. Matrix chain multiplication

- The func takes 2 params, i and j
- We start the recursion from 1 and n - 1.
- Base condition:
  if i == j return 0
- We need to run a for loop from i to j and find the min steps.
  Steps = arr[i - 1] _ arr[k] _ arr[j] + f(i, k) + f(k + 1, j)
- For tabulation, we run the for loop from i = n - 1 to 1 and j from i + 1 to n.

2. Minimum Cost to Cut a Stick

- The func takes 2 params, i and j
- We add 0 at the start and given n at the end of the arr and sort the arr
- We start the recursion from 1 and c ( length of the given arr).
- Base condition:
  if i > j return 0
- We need to run a for loop from i to j (inclusive) and find the min cuts.
  Cuts = cuts[j + 1] - cuts[i - 1] + f(i, k - 1) + f(k + 1, j)
- For tabulation, we run the for loop from i = c to 1 and j from i to c.

3. Burst Balloons

- The func takes 2 params, i and j
- We add 0 at the start and given n at the end of the arr.
- We start the recursion from 1 and n ( length of the given arr).
- Base condition:
  if i > j return 0
- We need to run a for loop from i to j (inclusive) and find the max coins.
  Coins = nums[i - 1] _ nums[k] _ nums[j + 1] + f(i, k - 1) + f(k + 1, j)
- For tabulation, we run the for loop from i = c to 1 and j from i to c.

## 3DP

4. Boolean Parenthesization

- The func takes 3 params, i and j and isTrue
- We start the recursion from 0 and n - 1 and 1.
- Base condition:
  if i > j return 0
  if i == j
  if (isTrue) return s[i] == 'T' ? 1 : 0
  return s[i] == 'F' ? 1 : 0
- We need to run a for loop from i + 1 to j and increment it by 2 to only partition at operator
- We will find lT, lF, rT, rF and find the no of ways if the s[i] is & or | or ^
- For tabulation, we run the for loop from 3 to n (inclusive) and 0 to i + len - 1 < n and consider j as i + len - 1

## Front partition

5. Palindrome Partitioning

- The func takes 1 params, i
- We start the recursion from 0
- Base condition
  if i == n return 0
- We need to run a for loop from i to n and check whether the current substring is a palindrome, if j == n - 1, then the count is 0, else count = 1 + f(j + 1) and
  take the min
- Optimal approach is creating a palindrome mapping and using that we can find whether a substring is palindrome or not easily.

6. Partition Array for Maximum Sum

- The func takes 1 params, i
- We start the recursion from 0
- Base condition
  if i == n return 0
- We need to run a for loop from i to Math.min(i + k, n) and find the maxNum in the curr subrr, find the sum which is (j - i + 1) \* maxNum + f(j + 1), track
  the maxSum
