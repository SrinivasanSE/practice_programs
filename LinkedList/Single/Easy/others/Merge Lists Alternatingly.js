class Solution {
  mergeList(head1, head2) {
    // Pointer to traverse list1
    let p1 = head1;

    // Pointer to traverse list2
    let p2 = head2;

    // Loop until either list ends
    while (p1 && p2) {
      // Store next pointers BEFORE changing links
      let next1 = p1.next; // next node in list1
      let next2 = p2.next; // next node in list2

      // Insert p2 node after p1
      p1.next = p2;

      // Connect p2 to the next node of list1
      p2.next = next1;

      // Move pointers forward
      p1 = next1;
      p2 = next2;
    }

    // Return:
    // 1. Modified first list head
    // 2. Remaining part of second list (if any)
    return [head1, p2];
  }
}

