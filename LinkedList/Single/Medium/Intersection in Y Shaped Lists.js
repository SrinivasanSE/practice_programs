// https://www.geeksforgeeks.org/write-a-function-to-get-the-intersection-point-of-two-linked-lists/


class Solution {
    // Function to find intersection point in Y shaped Linked Lists.
    intersectPoint(head1, head2) {
        // your code here
        const hashmap = new Set()
        
        let curr = head1
        
        while(curr) {
            hashmap.add(curr)
            curr = curr.next
        }
        
        curr = head2
        
        while(curr) {
            if(hashmap.has(curr)) {
                return curr
            }
            curr = curr.next
        }
    }
}
