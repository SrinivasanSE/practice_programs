// https://www.geeksforgeeks.org/delete-alternate-nodes-of-a-linked-list/

class Solution {
    deleteAlt(head) {
        // Code here
        if(!head) {
            return
        }
        let prev = head
        let curr = head.next
        while(prev && curr) {
            prev.next = curr.next
            prev = prev.next // there may not be any elements left, ex: 1, 2, 3, 4, null
            curr = null
            if(prev) {
                curr = prev.next
            }
        }
        
        return head
    }
}
