// https://www.geeksforgeeks.org/merge-sort-for-linked-list/


class Solution {
    // Function to sort the given linked list using Merge Sort.
    merge2sortedList(head1, head2) {
        let dummy = new Node(-1);
        let curr = dummy;
        let temp1 = head1;
        let temp2 = head2;

        while (temp1 !== null && temp2 !== null) {
            if (temp1.data >= temp2.data) {
                curr.next = temp2;
                temp2 = temp2.next;
            } else {
                curr.next = temp1;
                temp1 = temp1.next;
            }
            curr = curr.next;
        }

        if (temp1 !== null) curr.next = temp1;
        if (temp2 !== null) curr.next = temp2;

        return dummy.next;
    }

    middle(head) {
        let slow = head;
        let fast = head.next;
        
        while (fast !== null && fast.next !== null) {
            slow = slow.next;
            fast = fast.next.next;
        }
        
        return slow;
    }

     mergeSort(head) {
        if (head === null || head.next === null) {
            return head;
        }
        
        let mid = this.middle(head);
        let right = mid.next;
        mid.next = null; // spliting the list, now left will cut off at the mid
        let left = head;

        left = this.mergeSort(left);
        right = this.mergeSort(right);

        return this.merge2sortedList(left, right);
    }
}
