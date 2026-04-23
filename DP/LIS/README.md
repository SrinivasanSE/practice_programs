
# LIS

## Math.max(pick, not pick)

1) Longest Increasing Subsequence

- The func takes 2 params, i and prev
- We start the recursion from 0 and prev as -1
- Base condition:
    if i == n return 0
- Use pick and not pick approach. 
    NotPick - find(i + 1, prev)

    if prev == -1 or nums[prev] < nums[i] 
        Pick - find(i + 1, i)
    return Math.max(pick, notPick)
- For tabulation, we run the for loop from i = n - 1 to 0 and i - 1 to -1 for prev.

- For space ops, we will use a diff approach
    - we will track the max and store the longest subseq ending at index in dp of size n and init it with 1.
    - we run two for loops, 1 to n for i and 0 to i for prev
    - if nums[prev] < nums[i]
        dp[i] = Math.max(dp[i], 1 + dp[prev])
    - track the max at the end of inner for loop and return it.

- Another efficient approach is binary search, we add the elements to the dp and replace it when the curr element is less than the last element in the dp.
    - we track the len and use a dp of size n.
    - Add the first element to the dp and run the for loop from 1 to n.
    - We check the last element in the dp is less than the curr element and add it to the dp and increment the len
    - else, we replace the element at the lower bound index with the curr element
    - At the end, just return the len

2) Number of Longest Increasing Subsequence

- We use the space ops approach from #1, we use the count arr to track the count
- if nums[prev] < nums[i]
    if dp[i] == 1 + dp[prev] // we extend the count
        count[i] += count[prev]
    else if dp[i] < 1 + dp[prev]
        dp[i] = 1 + dp[prev]
        count[i] = count[prev]
- we run the for loop at the end and if max is eq to the dp[i], we add the count from the count arr at the same index.
- Return the res

3) Print LIS

- We use the space ops approach from #1, we use the hash arr to track the LIS, init with -1 and use lastIndex = -1
- if nums[prev] < nums[i] and dp[i] < 1 + dp[prev]
    dp[i] = 1 + dp[prev]
    hash[i] = prev              // we use this to track the LIS
- Track the lastIndex when we find a new max
- Using the lastIndex, we can run a while loop till it's not -1 and backtrack it and add the element at the lastIndex to the res
- Reverse the res and return 


4) Largest Divisible Subset

- Similar to #3, we just need to sort the arr and instead of nums[prev] < nums[i], it should be nums[i] % nums[prev] == 0


5) Longest String Chain

- Similar to #3, we just need to sort the arr and instead of nums[prev] < nums[i], we need to compare the two strings and see if they differ by just single char.
- Another approach is there, we use a map and loop through the words and form different combination of word with one missing char, if this exists in the map, we try to extend the length if its max, we set the max length for the current word and also track the max value
- Return the max

6) Longest Bitonic Subsequence

- Similar to #1, but we need to find both LIS and LDS
- We use the same logic for LIS
- For LDS, we run the for loop from n - 1 to 0 and n - 1 to i for prev and use the same if logic
- While finding LDS itself, we can find the max bitonic seq, if both lds[i] > 1 and lis[i] > 1, max = Math.max(max, lds[i] + lis[i] - 1)
- Return the max