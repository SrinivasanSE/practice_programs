# MCM

1) Matrix chain multiplication

- The func takes 2 params, i and j
- We start the recursion from 1 and n - 1.
- Base condition:
    if i == j return 0
- We need to run a for loop from i to j and find the min steps. 
    Steps = arr[i - 1] * arr[k] * arr[j] + f(i, k) + f(k + 1, j)
- For tabulation, we run the for loop from i = n - 1 to 1 and j from i + 1 to n.


2) Minimum Cost to Cut a Stick

- The func takes 2 params, i and j
- We add 0 at the start and given n at the end of the arr and sort the arr
- We start the recursion from 1 and c ( length of the given arr).
- Base condition:
    if i > j return 0
- We need to run a for loop from i to j (inclusive) and find the min cuts. 
    Cuts = cuts[j + 1] - cuts[i - 1] + f(i, k - 1) + f(k + 1, j)
- For tabulation, we run the for loop from i = c to 1 and j from i to c.

3) Burst Balloons

- The func takes 2 params, i and j
- We add 0 at the start and given n at the end of the arr.
- We start the recursion from 1 and n ( length of the given arr).
- Base condition:
    if i > j return 0
- We need to run a for loop from i to j (inclusive) and find the max coins. 
    Coins = nums[i - 1] * nums[k] * nums[j + 1] + f(i, k - 1) + f(k + 1, j)
- For tabulation, we run the for loop from i = c to 1 and j from i to c.


4) Boolean Parenthesization (# 3DP problem)

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
