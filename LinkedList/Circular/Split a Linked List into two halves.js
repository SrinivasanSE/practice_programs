// https://www.geeksforgeeks.org/split-a-circular-linked-list-into-two-halves/

function splitList(head) {
  let slow = head;
  let fast = head;

  if (head === null) return [null, null];

  // For odd nodes, fast->next is head and
  // for even nodes, fast->next->next is head
  while (fast.next !== head && fast.next.next !== head) {
    fast = fast.next.next;
    slow = slow.next;
  }

  // If there are even elements in list
  // then move fast
  if (fast.next.next === head) fast = fast.next;

  // Set the head pointer of first half
  const head1 = head;

  // Set the head pointer of second half
  const head2 = slow.next;

  // Make second half circular
  fast.next = slow.next;

  // Make first half circular
  slow.next = head;

  return [head1, head2];
}
