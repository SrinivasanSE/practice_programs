// https://leetcode.com/problems/rotate-list/description/
// https://www.geeksforgeeks.org/problems/rotate-a-linked-list/1

// right rotate & left rotate



const getKthNode = (node, k) => {
    let curr = node
    k--
    while (k) {
        k--
        curr = curr.next
    }
    return curr
}

const count = (node) => {
    let curr = node, count = 0
    while (curr.next) {
        count++
        curr = curr.next
    }

    return [curr, count + 1]
}
var rotateRight = function(head, k) {
    if (head === null) return null
    let [tail, n] = count(head)
    k = k % n
    if (k === 0) {
        return head
    }
    tail.next = head // we link the tail with head, so they form the chain
    let kthNode = getKthNode(head, n - k) // --------------------------------for left rotate, just pass k
    const newHead = kthNode.next, // [1, 2, 3, 4, 5], 4 will be the head and 5 is linked to 1 already
    kthNode.next = null // breaking the link after 3

    return newHead

};