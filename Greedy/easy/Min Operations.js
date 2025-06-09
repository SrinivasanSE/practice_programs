// https://www.geeksforgeeks.org/minimize-steps-to-reach-k-from-0-by-adding-1-or-doubling-at-each-step/


class Solution {

    minOperation(n) {

        // code here
        let c = 0
        
        while (n > 0) {
            if (n % 2 === 0) {
                n/=2
            } else {
                n-=1
            }
            c++
        }
        
        return c
    }
}