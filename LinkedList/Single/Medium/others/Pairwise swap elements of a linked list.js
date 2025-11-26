// https://www.geeksforgeeks.org/pairwise-swap-elements-of-a-given-linked-list/
// https://www.geeksforgeeks.org/pairwise-swap-elements-of-a-given-linked-list-by-changing-links/


class Solution {
    pairWiseSwap(head) {
        // your code here
        let curr = head;

    while (curr !== null && curr.next !== null) {
        
        [curr.data, curr.next.data] = [curr.next.data, curr.data];

        // Move to the next pair
        curr = curr.next.next;
    }
    
    return head
        
    }
}


class Solution {
    pairWiseSwap(head) {
        // your code here
        if(!head || !head.next) {
            return head
        }
        
        let prev = head
        let curr = head.next
        
        let newHead = curr
        
        while(1) {
            let next = curr.next
            curr.next = prev
            
            if(!next || !next.next) {
                prev.next = next
                break
            }
            
            prev.next = next.next
            prev = next
            curr = prev.next
        }
        
        return newHead
        
    }
}

