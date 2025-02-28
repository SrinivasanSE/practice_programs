// https://www.geeksforgeeks.org/delete-n-nodes-after-m-nodes-of-a-linked-list/


class Solution {
    linkdelete(head, n, m) {
        // code here
        let curr = head
        let i = n
        let j = m
        while(curr) {
            j--
            if(j === 0) {
                let temp = curr.next
                while(i-- && temp) {
                    temp = temp.next
                }
                i = n
                j = m 
                curr.next = temp
            } 
            curr = curr.next
            
        }
    }
}
