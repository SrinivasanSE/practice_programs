// https://www.geeksforgeeks.org/delete-nodes-which-have-a-greater-value-on-right-side/


class Solution {
    
    reverse(head) {
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

    compute(head) {
        // your code here
        head = this.reverse(head)
        let curr = head
        let max = head.data
        while(curr.next) {
            if (curr.next.data < max) {
                curr.next = curr.next.next  // curr which has the max value will stay the same place while the next keeps changing
            } else {
                curr = curr.next
                max = curr.data
            }
        }
        head = this.reverse(head)
        return head
        
        
    }
}


class Solution {

    compute(head) {
        // your code here
        if (!head || !head.next) {
            return head
        }
        
        head.next = this.compute(head.next)
        
        if (head.data < head.next.data) {
            return head.next
        }
        
        return head
        
        
    }
}
