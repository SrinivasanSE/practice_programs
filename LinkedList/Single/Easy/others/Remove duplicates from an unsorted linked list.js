// https://www.geeksforgeeks.org/remove-duplicates-from-an-unsorted-linked-list/

class Solution {
  // Function to remove duplicates from unsorted linked list.
  removeDuplicates(head) {
    // your code here
    const set = new Set();

    let curr = head;
    let prev = null;
    while (curr) {
      if (set.has(curr.data)) {
        prev.next = curr.next;
      } else {
        prev = curr;
        set.add(curr.data);
      }
      curr = curr.next;
    }

    return head;
  }
}
