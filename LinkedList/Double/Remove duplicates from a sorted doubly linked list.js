// https://www.geeksforgeeks.org/problems/remove-duplicates-from-a-sorted-doubly-linked-list/1


class Solution {

    removeDuplicates(head) {
        // code here
        
        // return head after editing list
        let curr = head, temp
        while (curr && curr.next) {
            temp = curr.next
            while (temp && temp.data === curr.data) {
                temp = temp.next
            }
            
            curr.next = temp
            if(temp)
                temp.prev = curr
            curr = curr.next
        }
        
        return head
        
    }
}



class Solution {

    removeDuplicates(head) {
        // code here
        
        // return head after editing list
        let curr = head
        while (curr.next) {
            if (curr.data === curr.next.data) {
                let next = curr.next.next
                if (next)
                    next.prev = curr
                curr.next = next
            } else {
                curr = curr.next
            }
        }
        
        return head
        
        
    }
}