// https://www.geeksforgeeks.org/sort-linked-list-0s-1s-2s-changing-links/
// https://www.geeksforgeeks.org/segregate-even-and-odd-elements-in-a-linked-list/


class Solution {
    // Function to sort a linked list of 0s, 1s and 2s.
    segregate(head) {
        // your code here
        if (!head || !(head.next)) return head;
        let one = new Node(-1), two = new Node(-1), zero = new Node(-1)
        let oneH = one
        let twoH = two
        let zeroH = zero
        
        let curr = head
        
        while(curr) {

            if (curr.data === 0) {
                zero.next = curr
                zero = zero.next
            } else if(curr.data === 1) {
                one.next = curr
                one = one.next
            } else {
                two.next = curr
                two = two.next
            }
            
            curr = curr.next
        }
        
        zero.next = oneH.next ? oneH.next : twoH.next
        one.next = twoH.next
        two.next = null
        
        return zeroH.next
    }
}
