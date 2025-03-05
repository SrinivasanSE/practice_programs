// https://www.geeksforgeeks.org/function-to-check-if-a-singly-linked-list-is-palindrome/


class Solution {
    // Function to check whether the list is palindrome.
    
    reverse(head) {
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
    isPalindrome(head) {
        // your code here
      if(!head || !head.next) {
            return true
        }
        let slow = head
        let fast = head
        
        while(fast && fast.next) {
            fast = fast.next.next
            slow = slow.next
        }
        let curr = head
        let head2 = this.reverse(slow)
        // the list should be reversed again to keep it same at the end
        while(head2 && curr) {
            //console.log(curr.data, head2.data)
            if(curr.data != head2.data) {
                return false
            }
            curr = curr.next
            head2 = head2.next
        }
        return true
    }
}
