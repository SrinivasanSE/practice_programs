// https://www.geeksforgeeks.org/problems/add-1-to-a-number-represented-as-linked-list/1

/*
Brute
O(3n) & O(1)

*/

const reverse = (head) => {
    let curr = head, prev = null, nxt
    
    while (curr) {
        nxt = curr.next
        curr.next = prev
        prev = curr
        curr = nxt
    }
    
    return prev
}

class Solution {
    addOne(node) {
        // your code here
        let carry = 1
        let head = reverse(node) // we reverse the node so that we can add from the back
        
        let temp = head
        while (temp) {
            temp.data = temp.data + carry
            if (temp.data < 10) {
                carry = 0
                break
            } else {
                carry = 1
                temp.data = 0
            }
            temp = temp.next
        }
        if (carry === 1) {
            const newNode = new Node(1)
            head = reverse(head)
            newNode.next = head
            return newNode
        }
        
        head = reverse(head) // we reverse it again to move it to it's original state
        return head
        
        
    }
}

/*
Optimal
O(N) & O(N)
*/


const findCarry = (node) => {
    if (node === null) { // this will go after the last node and return 1
        return 1
    }
    let carry = findCarry(node.next)
    node.data = node.data + carry
    if (node.data < 10) {
        return 0
    }
    
    node.data = 0
    return 1
}

class Solution {
    addOne(node) {
        // your code here
        let carry = findCarry(node)
        
        if (carry === 1) {
            let newNode = new Node(1)
            newNode.next = node
            return newNode
        }
        
        return node  
    }
}