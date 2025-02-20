// https://www.geeksforgeeks.org/find-length-of-loop-in-linked-list/
// https://www.geeksforgeeks.org/floyds-cycle-finding-algorithm/
// https://www.geeksforgeeks.org/detect-loop-in-a-linked-list/

//hashset solution is there
class Solution {
    // Function to find the length of a loop in the linked list.
    countNodesinLoop(head) {
        // your code here
        let curr = head
        let c = 0
        let visited = new Set()
        while(curr) {
            if (visited.has(curr)) {
                c = 1
                let temp = curr.next
                while(temp != curr) {
                    temp = temp.next
                    c++
                }
                break
            } else {
                visited.add(curr)
            }
            curr = curr.next
        }
        
        
        return c
    }
}

// floyds-cycle-finding-algorithm
class Solution {
    // Function to find the length of a loop in the linked list.
    countNodesinLoop(head) {
        // your code here
        let slow = head, fast = head
        let c = 0
        while(fast && fast.next) {
            slow = slow.next
            fast = fast.next.next
            
            if (slow === fast) { // at each cycle, the distance between them will increase by k + 1, k + 2 and eventually n where they should meet
                c++
                slow = slow.next
                while(slow != fast) {
                    c++
                    slow = slow.next
                }
                break
            } 
        }
        
        return c
    }
}
