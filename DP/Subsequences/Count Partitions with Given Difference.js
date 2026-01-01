// https://www.geeksforgeeks.org/problems/partitions-with-given-difference/1

//TODO - understand why this works


/*

S1 - S2 = d    ----------------------- (1)

S1 = totalSum - S2 ------------------- (2)

Sub (2) in (1)

totalSum - S2 - S2 = d

totalSum - d = 2S2

S2 = (totalSum - d)/2

if we find the count of subsets with S2 sum, that means there are that many count of subsets available with difference d and s1 greater than s2


*/


class Solution {

    countPartitions(arr, d) {
        // code here
        const totalSum = arr.reduce((accum, curr) => accum + curr)
        if (totalSum - d < 0 || (totalSum - d) % 2) return 0 // S2 should be a integer and can't be decimal, so totalSum - d should be even and also it can't be negative
        const target = (totalSum - d) / 2 // can be (totalSum + d)/2 as well
        return this.countSubsetSum(arr, target) // Same as DP/medium/Count Subsets with Sum K.js
        
    }
    
}
