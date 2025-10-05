// https://www.geeksforgeeks.org/minimize-steps-to-reach-k-from-0-by-adding-1-or-doubling-at-each-step/


// O(logn) & O(1)

class Solution {

    minOperation(n) {

        // code here
        let c = 0
        
        while (n > 0) { // This is greedy — we always make the best move at each step to get closer to 0 faster.
            if (n % 2 === 0) {
                n/=2 // Dividing by 2 reduces the number much faster than subtracting 1, so we always do it when possible
            } else {
                n-=1
            }
            c++
        }
        
        return c
    }
}