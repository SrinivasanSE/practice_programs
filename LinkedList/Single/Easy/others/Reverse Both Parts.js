// https://www.geeksforgeeks.org/problems/reverse-both-parts--170647/1?page=2&category=Linked%20List&difficulty=Easy&sortBy=submissions


class Solution {
     
    _reverse(head) {
        if (!head) {
            return head
        }
        let curr = head
        let prev = null
        while(curr) {
            let nxt = curr.next
            curr.next = prev
            prev = curr
            curr = nxt
        }
        
        return prev
    }
    reverse(head, k) {
        // code here
        let i = 1
        let curr = head
        while(i < k) {
            curr = curr.next
            i++
        }
        
        let temp = curr.next
        curr.next = null
        head = this._reverse(head)
        //console.log(head1)
        temp = this._reverse(temp)
        curr = head
        while(curr.next) {
            curr = curr.next
        }
        curr.next = temp
        return head
        
        
    
    }
}
