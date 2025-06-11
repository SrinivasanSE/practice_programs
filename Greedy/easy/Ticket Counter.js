// https://www.geeksforgeeks.org/find-out-the-person-who-got-the-ticket-last/

class Solution {
    distributeTicket(n, k) {
        // code here
        let left = 1
        let right = n
        
        while (left < right) {
            if (left + k > right) {
                return right
            }
            left += k
            
            if (right - k < left) {
                return left
            }
            
            right-=k
        }
        
        return left
    }
}