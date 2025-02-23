// https://www.geeksforgeeks.org/delete-middle-of-linked-list/

class Solution {
    deleteMid(head) {
        // your code here
        if(!head || !head.next) {
            return null
        }
        
        let prev = head
        let slow = head
        let fast = head
        
        while(fast && fast.next) {
            prev = slow
            slow = slow.next
            fast = fast.next.next
        }
        prev.next = slow.next
        
        return head
    }
}
