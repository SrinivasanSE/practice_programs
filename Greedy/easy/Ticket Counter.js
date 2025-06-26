// https://www.geeksforgeeks.org/find-out-the-person-who-got-the-ticket-last/

class Solution {
    distributeTicket(n, k) {
        // code here
        let left = 1
        let right = n
        
        while (left < right) {
            if (left + k > right) { // if left crosses right, that means there are no persons available in the left, so the last person will be in the right
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