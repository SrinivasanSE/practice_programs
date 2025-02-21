// https://www.geeksforgeeks.org/reverse-a-doubly-linked-list/

class Solution {
    reverseDLL(head) {
        // code here
        let prev = null
        let curr = head
        let nxt
        while(curr) {
            nxt = curr.next
            curr.next = curr.prev
            curr.prev = nxt
            prev = curr
            curr = nxt
            
        }
        return prev
    }
}

class Solution {
    reverseDLL(head) {
        // code here
        let curr = head
        if(!curr.next) {
            return head
        }
        let temp = null
        while(curr) {
           temp = curr.prev
           curr.prev = curr.next
           curr.next = temp
           curr = curr.prev
            
        }
       
        return temp.prev // temp will point to the second node and it's previous will be the first node which is head
    }
}

