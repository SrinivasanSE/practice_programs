// https://leetcode.com/problems/sort-list/description/

/*
O(NLogN) & O(logn)
*/

const findMiddle = (head) => {

    if (head == null || head.next === null) return head
    let slow = head
    let fast = head.next // in the case of even, we need the first mid, so this is needed.

    while (fast && fast.next) {
        slow = slow.next
        fast = fast.next.next
    }

    return slow
}

const merge = (left, right) => {
    let head = new ListNode()
    let temp = head
    while (left && right) {
        if (left.val <= right.val) {
            temp.next = left
            left = left.next
        } else {
            temp.next = right
            right = right.next
        }
        temp = temp.next
    }

   if (left) {
    temp.next = left
   } else {
    temp.next = right
   }

    return head.next
}

var sortList = function(head) {
    if (head === null || head.next === null) {
        return head
    }

    const middle = findMiddle(head)
    let right = middle.next
    middle.next = null
    let left = head
    left = sortList(left)
    right = sortList(right)
    return merge(left, right)
};