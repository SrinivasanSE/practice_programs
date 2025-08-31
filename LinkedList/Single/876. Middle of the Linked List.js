// https://www.geeksforgeeks.org/write-a-c-function-to-print-the-middle-of-the-linked-list/

/*
We can use the Hare and Tortoise Algorithm to find the middle of the linked list. 
Traverse linked list using a slow pointer (slow_ptr) and a fast pointer (fast_ptr ). 
Move the slow pointer to the next node(one node forward) and the fast pointer to the next of the next node(two nodes forward). 
When the fast pointer reaches the last node or NULL, then the slow pointer will reach the middle of the linked list. 

In case of odd number of nodes in the linked list, slow_ptr will reach the middle node when fast_ptr will reach the last node and in case of even number of nodes in the linked list, 
slow_ptr will reach the middle node when fast_ptr will become NULL.
*/

//O(n)
class Solution {
    /* Should return data of middle node. If linked list is empty, then  -1*/
    
    
    getMiddle(node) {
        // your code here
        if(!node) {
            return -1
        }
        let slow = node
        let fast = node
        while(fast && fast.next) {
            slow = slow.next
            fast = fast.next.next
        }
        
        return slow.data
    }
}

//O(n)
class Solution {
    /* Should return data of middle node. If linked list is empty, then  -1*/
    size(node) {
        let count = 0
        let curr = node
        while(curr) {
            curr = curr.next
            count++
        }
        return count
    }
    getAt(node, index) {
        let i = 0
        let curr = node
        while(i < index && curr) {
            i++
            curr = curr.next
        }
        return curr.data
    }
    getMiddle(node) {
        // your code here
        if(!node) {
            return -1
        }
        let i = 0
        const length = this.size(node)
        const middle = Math.floor(length/2)
        return this.getAt(node, middle)
    }
}
