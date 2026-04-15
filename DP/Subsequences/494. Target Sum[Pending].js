// https://leetcode.com/problems/target-sum/description/

// TODO: can be also implemented using assigning + and - at each step

/*

Let’s denote:

P = subset of elements with a + sign

N = subset of elements with a - sign

We have:

sum(P) - sum(N) = k
sum(P) + sum(N) = totalSum


Add both:

2 * sum(P) = totalSum + k
=> sum(P) = (totalSum + k) / 2


So, we just need to count the number of subsets with sum = (totalSum + k)/2.


*/


// Can be solved using DP/medium/Count Partitions with Given Difference.js

