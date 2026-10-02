// https://www.geeksforgeeks.org/delete-middle-of-linked-list/
// https://leetcode.com/problems/delete-the-middle-node-of-a-linked-list/description/


var deleteMiddle = function(head) {
    if (head == null || head.next == null) {
        return null
    }
    let slow = head
    let fast = head
    fast = fast.next.next // important, we need to move it forward, else slow will be null

    while (fast && fast.next != null) {
        slow = slow.next
        fast = fast.next.next
    }
    slow.next = slow.next.next
    return head
};

class Solution {
    deleteMid(head) {
        // your code here
        if(!head || !head.next) {
            return null
        }
        
        let prev = head // we use the prev to find the node before t
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
