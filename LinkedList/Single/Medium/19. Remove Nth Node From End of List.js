// https://leetcode.com/problems/remove-nth-node-from-end-of-list/description/


var removeNthFromEnd = function(head, n) {
    let first = head, second = head, count = 0
    while (count < n) {
        count++
        first = first.next
    }
    if (!first) {
        return head.next
    }
    while (first.next) {
        first = first.next
        second = second.next
    }
    

    second.next = second.next.next
    return head
};