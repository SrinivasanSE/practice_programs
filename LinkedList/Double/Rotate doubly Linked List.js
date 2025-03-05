// https://www.geeksforgeeks.org/rotate-doubly-linked-list-n-nodes/

class Solution {
    rotateDLL(head, p) {
        // Code here
        let tail = head
        
        while(tail.next) {
            tail = tail.next
            
        }
        
        tail.next = head // making it circular
        head.prev = tail
        let i = 0
        while(i < p) {
            tail = tail.next 
            head = head.next //head will be at the p + 1 node and tail will be at the p node
            i++
        }

      // this will disconnect the p and p + 1 node
        tail.next = null 
        head.prev = null
        
        return head
        
    }
}

function rotateDLL(head, p) {
    let curr = head;

    // Traverse to the p-th node
    for (let i = 1; i < p; i++) {
        curr = curr.next;
    }

    if (!curr || !curr.next) return start;

    // Update pointers to perform the rotation
    let newHead = curr.next;
    newHead.prev = null;
    curr.next = null;

    let tail = newHead;
    while (tail.next) {
        tail = tail.next;
    }

    // Connect the old tail to the old head
    tail.next = head;
    head.prev = tail;

    return newHead;
}
