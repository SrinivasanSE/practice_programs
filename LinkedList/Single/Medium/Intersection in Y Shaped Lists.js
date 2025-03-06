// https://www.geeksforgeeks.org/write-a-function-to-get-the-intersection-point-of-two-linked-lists/

/*
The idea is to find the difference (d) between the count of nodes in both the lists. Initialize the start pointer in both the lists and then increment the start pointer of the longer list by d nodes. 
Now, we have both start pointers at the same distance from the intersection point, so we can keep incrementing both the start pointers until we find the intersection point.  
*/

// O(m + n) & O(1)
class Solution {
    // Function to find intersection point in Y shaped Linked Lists.
    count(head) {
        let len = 1
        let curr = head
        while(curr.next) {
            len++
            curr = curr.next
        }
        
        return len
    }
    intersectPoint(head1, head2) {
        // your code here
        let c1 = this.count(head1)
        let c2 = this.count(head2)
        let diff
        if (c1 > c2) {
            diff = c1 - c2
            while(diff--) {
                head1 = head1.next
            }
            
           
        } else {
            diff = c2 - c1
            while(diff--) {
                head2 = head2.next
            }
            
            
        }
        
        while(head1 != head2) {
                head1 = head1.next
                head2 = head2.next
        }
        
        return head1
    }
}

// O(m + n) & O(1)
class Solution {
    // Function to find intersection point in Y shaped Linked Lists.
    intersectPoint(head1, head2) {
        // your code here
        let p1 = head1
        let p2 = head2
        // Once both of them go through reassigning, they will be at equal distance from the collision point.
        while(p1 != p2) {
            p1 = p1 ? p1.next : head2
            p2 = p2 ? p2.next : head1
        }
        
        return p2
    }
}



// hashing - O(m + n) & O(m + n)
class Solution {
    // Function to find intersection point in Y shaped Linked Lists.
    intersectPoint(head1, head2) {
        // your code here
        const hashmap = new Set()
        
        let curr = head1
        
        while(curr) {
            hashmap.add(curr)
            curr = curr.next
        }
        
        curr = head2
        
        while(curr) {
            if(hashmap.has(curr)) {
                return curr
            }
            curr = curr.next
        }
    }
}
