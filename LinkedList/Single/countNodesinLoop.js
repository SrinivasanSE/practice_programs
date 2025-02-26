// https://www.geeksforgeeks.org/find-length-of-loop-in-linked-list/
// https://www.geeksforgeeks.org/floyds-cycle-finding-algorithm/
// https://www.geeksforgeeks.org/detect-loop-in-a-linked-list/
// https://www.geeksforgeeks.org/find-first-node-of-loop-in-a-linked-list/
// https://www.geeksforgeeks.org/detect-and-remove-loop-in-a-linked-list/

// similar problem for checking circular ll
isCircular(head) {
        // code here
        let slow = head
        let fast = head
        
        while(fast && fast.next) {
            fast = fast.next.next
            slow = slow.next
            
            if (slow === fast) {
                return true
            }
        }
        
        return false
    }

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


findFirstNode(head) {
        // code here
        let slow = head
        let fast = head
        
        while(fast && fast.next) {
            slow = slow.next
            fast = fast.next.next
            
            if (slow === fast) {
                slow = head // point the head to slow, slow and fast will now meet at the first node
                while(slow != fast) {
                    slow = slow.next
                    fast = fast.next
                }
                
                return slow
            }
        }
        
        return null
    }



// Function to detect and remove loop in the linked list
function removeLoop(head) {

    // If list is empty or has only one node without loop
    if (head == null || head.next == null) return;

    let slow = head, fast = head;

    // Move slow and fast 1 and 2 steps 
    // ahead respectively
    slow = slow.next;
    fast = fast.next.next;

    // Search for loop using slow and fast pointers
    while (fast != null && fast.next != null) {
        if (slow == fast) break;

        slow = slow.next;
        fast = fast.next.next;
    }

    // If loop exists
    if (slow == fast) {
        slow = head;

        // If the loop starts at the head of the list
        if (slow != fast) {
            while (slow.next != fast.next) {
                slow = slow.next;
                fast = fast.next;
            }

            // Remove the loop
            fast.next = null;
        } else {
        
            // Special case when loop starts at the head
            while (fast.next != slow) {
                fast = fast.next;
            }
            fast.next = null;
        }
    }
}
