// https://leetcode.com/problems/linked-list-cycle-ii/description/


// Brute - hashmap

var detectCycle = function(head) {
    const seen = new Set();

    while (head) {
        if (seen.has(head)) {
            return head;
        }
        seen.add(head);
        head = head.next;
    }

    return null;
};

// Optimal - Two pointers

var detectCycle = function(head) {
    let slow = head
    let fast = head

    while (fast != null && fast.next != null) {
        slow = slow.next
        fast = fast.next.next

        if (slow === fast) {
            slow = head
            while (slow != fast) {
                slow = slow.next
                fast = fast.next
            }

            return fast
        }
    }
    return null
};