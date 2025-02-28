// https://www.geeksforgeeks.org/find-fractional-nk-th-node-linked-list/


class Solution {
    // Function to find the fractional node in the linked list.
    findLength(head) {
        let count = 0
        let curr = head
        while(curr) {
            count++
            curr = curr.next
        }
        
        return count
    }
    fractional_node(head, k) {
        // your code here
        const n = this.findLength(head)
        const index = Math.ceil(n/k)
        let i = 1
        let curr = head
        while (i < index) {
            curr = curr.next
            i++
        }
        
        return curr.data
        
    }
}

class Solution {
    // Function to find the fractional node in the linked list.
    fractional_node(head, k) {
        // your code here
        let slow = null
        let fast = head
        let i = 0
        while(fast) {
            if (i%k === 0) { // 30/3 = 10, by moving at each multiple, slow would be at the n/k index
                if(!slow) {
                    slow = head
                } else {
                    slow = slow.next
                }
            }
            i++
            fast = fast.next
        }
        
        return slow.data
        
    }
}
