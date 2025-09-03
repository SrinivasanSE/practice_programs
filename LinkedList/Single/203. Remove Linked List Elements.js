// https://leetcode.com/problems/remove-linked-list-elements/description/


var removeElements = function(head, val) {
    let curr = head, prev = null
    while (curr) {
        if (curr.val === val) {
            if (curr === head) {
                head = head.next
            }
            if (prev) {
                prev.next = curr.next
            }
        } else {
            prev = curr // the prev should move only when the curr element is not equal to val
        }
        curr = curr.next
    }

    return head
};