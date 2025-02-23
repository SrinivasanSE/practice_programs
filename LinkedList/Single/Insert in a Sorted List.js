// https://www.geeksforgeeks.org/given-a-linked-list-which-is-sorted-how-will-you-insert-in-sorted-way/

class Solution {
    sortedInsert(head, key) {
        // your code here
        const node = new Node(key)
        if(head.data >= key) {
            node.next = head
            head = node
            return node
        }
        
        let curr = head
        while(curr.next && curr.next.data < key) {
            curr = curr.next
        }
        
        node.next = curr.next
        curr.next = node
        
        return head
    }
}

class Solution {
    sortedInsert(head, key) {
        // your code here
        const node = new Node(key)
        
        let prev = null
        let curr = head
        while(curr) {
            if (curr.data >= key) {
                break
            }
            prev = curr
            curr = curr.next
        }
        
        if(!prev) {
            node.next = head
            head = node
        } else {
            node.next = curr
        prev.next = node
        }
        
        return head
    }
}
