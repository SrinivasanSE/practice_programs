// https://www.geeksforgeeks.org/add-two-numbers-represented-by-linked-list/
// https://leetcode.com/problems/add-two-numbers/description/


/*
Time Complexity: O(m + n), where m and n are the sizes of input linked list.
Auxiliary Space: O(max(m, n)), as we create a new linked list to store the sum of two linked lists
*/

class Solution {
    
    reverse(head) {
        let curr = head
        let prev = null
        
        while(curr) {
            let next = curr.next
            curr.next = prev
            prev = curr
            curr = next
        }
        
        return prev
    }
    addTwoLists(num1, num2) {
        // code here
        while (num1 && num1.data === 0) { // this is for skipping leading zeros
            num1 = num1.next
        }
        while (num2 && num2.data === 0) {
            num2 = num2.next
        }
        num1 = this.reverse(num1) // this is not needed when the input is already reversed
        num2 = this.reverse(num2)
        
        let carry = 0
        let temp, digit, head = null
        
        while (num1 || num2 || carry) {
            digit = carry
            
            if (num1) {
                digit += num1.data
                num1 = num1.next
            }
            if (num2) {
                digit += num2.data
                num2 = num2.next
            }
            carry = Math.floor(digit/10)
            temp = new Node(digit%10)
            temp.next = head
            head = temp
            
        }
        
        return head
    }
}



/*
Time Complexity: O(m + n), where m and n are the sizes of input linked list.
Auxiliary Space: O(1), as no extra linked list is used to store the sum.
*/

// we store the ans in the longest num list itself and reverse it to get the ans
class Solution {
    
    reverse(head) {
        let curr = head
        let prev = null
        
        while(curr) {
            let next = curr.next
            curr.next = prev
            prev = curr
            curr = next
        }
        
        return prev
    }
    count(head) {
        let curr = head
        let count = 0
        while(curr) {
            count++
            curr = curr.next
        }
        
        return count
    }
    addTwoLists(num1, num2) {
        // code here
        while (num1 && num1.data === 0) {
            num1 = num1.next
        }
        while (num2 && num2.data === 0) {
            num2 = num2.next
        }
        
        let count1 = this.count(num1)
        let count2 = this.count(num2)
        if(count1 < count2) {
            return this.addTwoLists(num2, num1)
        }
        num1 = this.reverse(num1)
        num2 = this.reverse(num2)
        
        let carry = 0
        let head = num1
        
        while (num2 || carry) {
            num1.data += carry
            if(num2) {
                num1.data += num2.data
                num2 = num2.next
            }
            carry = Math.floor(num1.data/10)
            num1.data = num1.data % 10
            if(!num1.next && carry) {
                num1.next = new Node(0)   
            }
            
            num1 = num1.next
            
        }
        
        return this.reverse(head)
    }
}
