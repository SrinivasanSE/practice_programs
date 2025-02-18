// https://www.geeksforgeeks.org/nth-node-from-the-end-of-a-linked-list/

class Solution {
    getKthFromLast(head, k) {
        // code here
        let i = head
        let j = head
        let count = 0
        while(count < k - 1) {
            j = j.next
            if(!j) {
                return -1
            }
            
            count+=1
            
        }
        
        while(j.next) {
            j = j.next
            i = i.next
        }
        
        return i.data
    }
}
