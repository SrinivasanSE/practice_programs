// https://www.geeksforgeeks.org/merge-two-sorted-linked-lists/



class Solution {
    sortedMerge(head1, head2) {
        // your code here
        let p1 = head1
        let p2 = head2
        let dummy = new Node(0)
        let curr = dummy
        while(p1 && p2) {
            
            if(p1.data < p2.data) {
                curr.next = p1
                p1 = p1.next
            } else {
                curr.next = p2
                p2 = p2.next
            } 
            curr = curr.next
        }
        
        if(p1) {
            curr.next = p1
        } 
        if(p2) {
            curr.next = p2
        }
        
        return dummy.next
   
