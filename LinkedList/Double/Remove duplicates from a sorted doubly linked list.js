// https://www.geeksforgeeks.org/problems/remove-duplicates-from-a-sorted-doubly-linked-list/1

class Solution {
  removeDuplicates(head) {
    // code here

    // return head after editing list
    let curr = head;
    while (curr.next) {
      if (curr.data === curr.next.data) {
        let next = curr.next.next;
        if (next) next.prev = curr;
        curr.next = next;
      } else {
        curr = curr.next;
      }
    }

    return head;
  }
}
