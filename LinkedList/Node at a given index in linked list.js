// https://www.geeksforgeeks.org/write-a-function-to-get-nth-node-in-a-linked-list/

class Solution {
    GetNth(head, index) {
        let curr = head
        let i = 0
        while(i < index - 1 && curr) {
            curr = curr.next
            i++
        }
        if(!curr) {
            return -1
        }
        
        return curr.data
        
    }
}
