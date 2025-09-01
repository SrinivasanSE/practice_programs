// https://leetcode.com/problems/odd-even-linked-list/description/


var oddEvenList = function(head) {
    const oddHead = new ListNode()
    const evenHead = new ListNode()
    let oddTail = oddHead
    let evenTail = evenHead
    let i = 0
    let curr = head
    while (curr) {
        i++
        let temp = curr
        curr = curr.next
        temp.next = null
        if (i % 2 === 0) {
            evenTail.next = temp
            evenTail = evenTail.next
        } else {
            oddTail.next = temp
            oddTail = oddTail.next
        }
    }

    oddTail.next = evenHead.next

    return oddHead.next
};