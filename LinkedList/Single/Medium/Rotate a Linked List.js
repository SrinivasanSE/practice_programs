// https://www.geeksforgeeks.org/rotate-a-linked-list/


class Solution {
    // Function to rotate a linked list.
    rotate(head, k) {
        // your code here
        if (k === 0 || !head) {
            return head
        }
        let curr = head
        let count = 1
        while(curr.next) {
            count++
            curr = curr.next
        }
        k = k%count
        if(k === 0 || count === 1) {
            return head
        }
        curr.next = head // make it circular
        let i = 0
        curr = head
        while(i < k - 1) {
            curr = curr.next
            i++
        }
        let newHead = curr.next
        curr.next = null // break the loop
        return newHead
        
    }
}

// Inefficient sol

/*
Time Complexity: O(n * k), where n is the number of nodes in Linked List and k is the number of rotations.
Auxiliary Space: O(1)
*/

function rotate(head, k) {
    if (k === 0 || head === null) {
        return head;
    }

    // Rotate the list by k nodes
    for (let i = 0; i < k; ++i) {
        let curr = head;
        while (curr.next !== null) {
            curr = curr.next;
        }

        // Move the first node to the last
        curr.next = head;
        curr = curr.next;
        head = head.next;
        curr.next = null;
    }
    return head;
}
