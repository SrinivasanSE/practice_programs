// https://www.geeksforgeeks.org/rotate-doubly-linked-list-n-nodes/

// left rotate

const getCount = (node) => {
    let curr = node
    let count = 1
    while (curr.next) {
        curr = curr.next
        count++
    }
    
    return [curr, count]
}

const getKthNode = (node, k) => {
  let curr = node;
  k--;
  while (k) {
    k--;
    curr = curr.next;
  }
  return curr;
};

class Solution { // similar to single linked list
    rotateDLL(head, k) {
        // Code here
        if (!head || !head.next) return head
        
        const [tail, count] = getCount(head)
        
        k = k % count
        
        if (k == 0) return head
        
        tail.next = head
        head.prev = tail
        let i = 0
        let curr = head
        const kthNode = getKthNode(head, k) // use n - k for right rotate
        const newHead = kthNode.next
        newHead.prev = null
        kthNode.next = null
        
        return newHead
    }
}



