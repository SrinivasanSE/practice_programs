// https://www.geeksforgeeks.org/remove-every-k-th-node-linked-list/

    deleteK(head, k) {
        // code here
        if (k === 1) {
            return null
        }
        let i = 1
        let prev = head
        let curr = head
        while(curr) {
            if(i%k === 0) {
                prev.next = curr.next
            } else {
            prev = curr
            }
            curr = curr.next
            i++
        }
        
        return head
    }

