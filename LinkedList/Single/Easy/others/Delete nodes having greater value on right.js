// https://www.geeksforgeeks.org/delete-nodes-which-have-a-greater-value-on-right-side/

// O(n) & O(1)

class Solution {
  compute(head) {
    // your code here
    head = this.reverse(head); // we need to reverse, so that we can delete the elements in the right side now instead of left in the orginal list which is not possible.
    let curr = head;
    let max = head.data;
    while (curr.next) {
      if (curr.next.data < max) {
        curr.next = curr.next.next; // curr which has the max value will stay the same place while the next keeps changing
      } else {
        curr = curr.next;
        max = curr.data;
      }
    }
    head = this.reverse(head);
    return head;
  }
}

// O(n) & O(1)

class Solution {
  compute(head) {
    // your code here
    if (!head || !head.next) {
      return head;
    }

    head.next = this.compute(head.next);

    if (head.data < head.next.data) { // 2 < 3, so return 3 now, so, we delete the node 2 which is having greater value 3 on right
      return head.next;
    }

    return head;
  }
}
