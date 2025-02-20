// https://www.geeksforgeeks.org/reverse-a-linked-list/

class Solution {
    reverseList(head) {
        // your code here
        let prev = null
        let curr = head
        let nxt
        while(curr) {
            nxt = curr.next
            curr.next = prev
            prev = curr
            curr = nxt
        }
        
        return prev
    }
}

/*
Example Walkthrough
Let's walk through the example with the linked list 1 -> 2 -> 3 -> 4 -> 5.

Initial Call: reverseList(head) where head is the node with value 1.

Recursive Calls:

reverseList(2): Reverses the list starting from node 2.
reverseList(3): Reverses the list starting from node 3.
reverseList(4): Reverses the list starting from node 4.
reverseList(5): Reverses the list starting from node 5.
Base Case: When reverseList(5) is called, it hits the base case since 5 is the last node. It returns the node 5.

Backtracking and Reversing:

For reverseList(4), it receives the node 5 as the reversed rest. It sets 4.next.next to 4 (making 5 -> 4) and 4.next to null.
For reverseList(3), it receives the node 5 as the reversed rest (now 5 -> 4). It sets 3.next.next to 3 (making 4 -> 3) and 3.next to null.
This process continues until the initial call reverseList(1) receives the reversed list starting with 5 and sets 2.next.next to 1 (making 2 -> 1) and 1.next to null.
Final Reversed List: The head of the reversed list is node 5, resulting in the list 5 -> 4 -> 3 -> 2 -> 1.

*/


class Solution {
    reverseList(head) {
        // your code here
        if(head === null || head.next === null) {
            return head
        }
        
        const rest = this.reverseList(head.next)
        
        head.next.next = head
        
        head.next = null
        
        return rest
    }
}
