// https://www.geeksforgeeks.org/intersection-of-two-sorted-linked-lists/


//nested loops - O(m*n)
class Solution {

    findIntersection(head1, head2) {
        // your code here
        let p1 = head1
        let p2 = head2
        let temp = null
        let newHead = null
        while(p1) {
            p2 = head2
            while(p2) {
                if(p2.data === p1.data) {
                    let node = new Node(p1.data)
                    if(!temp) {
                        newHead = node
                    } else {
                        temp.next = node
                    }
                    temp = node
                    break
                }
                p2 = p2.next
            }
            p1 = p1.next
        }
        //console.log(newHead)
        
        return newHead
    }
}

// hashing
function findIntersection(head1, head2) {
        // your code here
        let p1 = head1
        let p2 = head2
        let dummy = new Node(0)
        let newHead = dummy
        let temp= newHead
        
        let hashmap = new Set()
        while(p2) {
            hashmap.add(p2.data)
            p2 = p2.next
        }
        
        while(p1) {
            const data = p1.data
            if(hashmap.has(data)) {
                const node = new Node(data)
                temp.next = node
                temp = node
            }
            p1 = p1.next
        }
        
        return newHead.next
    }


// two pointer - O(m + n) & O(min(m,n))
class Solution {

    findIntersection(head1, head2) {
        // your code here
        let p1 = head1
        let p2 = head2
        let dummy = new Node(0)
        let temp = dummy
        
        while(p1 && p2) {
            if (p1.data < p2.data) {
                p1 = p1.next
            } else if (p1.data > p2.data) {
                p2 = p2.next
            } else {
                const node = new Node(p1.data)
                temp.next = node
                temp = temp.next
                p1 = p1.next
                p2 = p2.next
            }
        }
        
        
        return dummy.next
    }
}


