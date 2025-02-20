// https://www.geeksforgeeks.org/remove-duplicates-from-a-sorted-linked-list/
// https://www.geeksforgeeks.org/remove-duplicates-sorted-array/

// recurrsion sol also there

class Solution {
    // Function to remove duplicates from sorted linked list.
    removeDuplicates(head) {
        // your code here
        let curr = head
        
        while(curr && curr.next) {
            if(curr.data === curr.next.data ) { //here the curr remains at the same place, next keeps moving
                curr.next = curr.next.next
            } else {
           
            curr = curr.next
            }
        }
        
        return head
    }
}

class Solution {
    // Function to remove duplicates from sorted linked list.
    removeDuplicates(head) {
        // your code here
        let curr = head.next
        let prev = head
        
        while(curr) {
            if(curr.data === prev.data ) { //here the prev remains at the same place and curr keeps moving
                prev.next = curr.next
            } else {
                prev = curr
            }
            curr = curr.next
        }
        
        return head
    }
}

