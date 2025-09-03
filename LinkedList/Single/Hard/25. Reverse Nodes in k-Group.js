// https://leetcode.com/problems/reverse-nodes-in-k-group/description/


const reverse = (head) => {
    let curr = head, prev = null, next
    while (curr) {
        next = curr.next
        curr.next = prev
        prev = curr
        curr = next
    }

    return prev
}

const getKthNode = (node, k) => {
    k--
    let curr = node
    while (k > 0 && curr) {
        curr = curr.next
        k--
    }

    return curr
}
var reverseKGroup = function(head, k) {
    if (k === 1) return head
    let temp = head, kthNode, nextNode, prevNode

    while (temp) {
        kthNode = getKthNode(temp, k)
        if (!kthNode) {
            if (prevNode)
                prevNode.next = temp
            break
        }
        nextNode = kthNode.next // getting the head of the next group node
        kthNode.next = null
        reverse(temp) // after reversal, kthNode will be become the head and temp will become the tail
        if(temp === head) { // for the first group alone, this will trigger
            head = kthNode 
        } else {
            prevNode.next = kthNode // we link the previous group with the new reversed group
        }
        prevNode = temp
        temp = nextNode
    }

    return head
};