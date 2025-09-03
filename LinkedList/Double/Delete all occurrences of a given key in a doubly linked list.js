// https://www.geeksforgeeks.org/delete-occurrences-given-key-doubly-linked-list/


class Solution {

    deleteAllOccurOfX(head_ref, key) {
        // Code for deleting all occurrences of key in the linked list goes here
        let curr = head_ref
        
        let prev, next
        while (curr) {
            if (curr.data === key) {
                if (curr === head_ref) { // if the temp is the head node, we move the head
                    head_ref = head_ref.next
                }
                prev = curr.prev
                next = curr.next
                if (prev) {
                    prev.next = next
                }
                if (next) {
                    next.prev = prev
                }
                curr = next
            } else {
                curr = curr.next
            }
            
        }
        
        return head_ref
    }
}