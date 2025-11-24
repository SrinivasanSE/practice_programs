// https://www.geeksforgeeks.org/delete-alternate-nodes-of-a-linked-list/

class Solution {
    deleteAlt(head) {
        // Code here
        let curr = head
        while (curr && curr.next) {
            curr.next = curr.next.next
            curr = curr.next
        }
        
        return head
    }
}