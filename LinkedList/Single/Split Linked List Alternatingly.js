// https://www.geeksforgeeks.org/alternating-split-of-a-given-singly-linked-list/


class Solution {
    
    append(dest, source) {
        const node = new Node(source.data)
        let last = dest[0]
        if(!last) {
            dest[0] = node
        } else {
            while(last.next) {
                last = last.next
            }
            last.next = node
        }
    }
    alternatingSplitList(head) {
        // code here
        let a = [], b = []
        let curr = head
        
        while(curr) {
            this.append(a, curr)
            curr = curr.next
            if(curr) {
                this.append(b, curr)
                curr = curr.next
            }
            
            
        }
        
        return [a[0], b[0]]
        
}
}

alternatingSplitList(head) {
        // code here
        let head1 = null,head2 = null,first = null,second = null
        
        let i = 0
        while(head) {
            let nxt = head.next
            if (i % 2 === 0) {
                if(!head1) {
                    head1 = head
                    first = head1
                } else {
                    first.next = head
                    first = head
                }
                first.next = null
            } else {
                if(!head2) {
                    head2 = head
                    second = head2
                } else {
                    second.next = head
                    second = head
                }
                second.next = null
            }
            i++
            head = nxt
        }
        
        return [head1, head2]
    }
