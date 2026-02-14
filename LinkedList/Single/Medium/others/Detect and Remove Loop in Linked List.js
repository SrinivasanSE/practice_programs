// https://www.geeksforgeeks.org/detect-and-remove-loop-in-a-linked-list/

/*

Brute - Hashing

O(n) & O(n)

*/

// hashing
function removeLoop(head) {
  let st = new Set();
  let prev = null;
  while (head != null) {
    // If node is already in the set, remove the loop
    if (st.has(head)) {
      prev.next = null;
      return;
    }

    // Add node to the set and move forward
    st.add(head);
    prev = head;
    head = head.next;
  }
}

/*

Optimal

O(n) & O(1)

*/

function removeLoop(head) {
  if (head == null || head.next == null) return;
  // empty list or single node (no loop possible) -> nothing to do

  let slow = head,
    fast = head;

  // Initialize where slow and fast start moving:
  slow = slow.next; // slow moves 1 step
  fast = fast.next.next; // fast moves 2 steps

  // Find meeting point if loop exists
  while (fast != null && fast.next != null) {
    if (slow == fast) break; // they met => loop detected
    slow = slow.next;
    fast = fast.next.next;
  }

  // If loop exists (because slow==fast)
  if (slow == fast) {
    slow = head; // reset slow to head

    if (slow != fast) {
      // Normal case: loop does NOT start at head
      while (slow.next != fast.next) {
        // find the node before the start of the loop
        slow = slow.next;
        fast = fast.next;
      }
      // fast.next (and slow.next) points to start of loop -> break it
      fast.next = null;
    } else {
      // Special case: loop starts at head (slow==fast==head)
      while (fast.next != slow) {
        // A(1) → B(2) → C(3) → A(1) -> Loops starts at the head, we need to get access to C node to break the loop,
        // so when c.next == A, the loop stops and we reset c.next = null
        fast = fast.next;
      }
      fast.next = null; // last loop node -> next = null
    }
  }
}
