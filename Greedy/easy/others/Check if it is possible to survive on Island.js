// https://www.geeksforgeeks.org/survival/

// O(1) & O(1)

/*

N - Maximum unit of food you can buy each day.
S - Number of days you are required to survive.
M - Unit of food required each day to survive.

*/


class Solution {
    minimumDays(S, N, M) {
        let totalFoodNeeded = S*M
        if (N < M) { // if unit of food required is greater than the max we can buy for a day, it's not possible to survive
            return -1
        }
        
        if (S >= 7 && N*6 < M*7) { // first food should be there for the 1st week, we can buy food only for first 6 days and we should survive sunday
            return -1
        }
        
        const minDays = Math.ceil(totalFoodNeeded / N)
        return minDays
    }
}