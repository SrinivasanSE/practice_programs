// https://www.geeksforgeeks.org/survival/


class Solution {
    minimumDays(S, N, M) {
        // code here
        let totalFoodNeeded = S*M

        
        if (N < M) {
            return -1
        }
        
        if (S >= 7 && N*6 < M*7) { // first food should be there for the 1st week
            return -1
        }
        
  
        let minDays = Math.floor(totalFoodNeeded / N)
        if (totalFoodNeeded % N) {
            minDays++
        }
        
        return minDays
    }
}