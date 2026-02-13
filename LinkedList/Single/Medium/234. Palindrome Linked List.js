// https://www.geeksforgeeks.org/function-to-check-if-a-singly-linked-list-is-palindrome/
// https://leetcode.com/problems/palindrome-linked-list/

const reverse = (head) => {
  let curr = head,
    prev = null,
    nxt;

  while (curr) {
    nxt = curr.next;
    curr.next = prev;
    prev = curr;
    curr = nxt;
  }

  return prev;
};

var isPalindrome = function (head) {
  if (head === null || head.next === null) {
    return true;
  }

  let slow = head,
    fast = head;
  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
  }
  // for even, the slow will point at the first node of the second half
  // for odd, the slow will point at the middle node, so we move the mode.
  // it will work without this step as well, but we will be reversing the list including the middle element
  if (fast) {
    slow = slow.next;
  }
  let newHead = reverse(slow);
  let first = head,
    second = newHead;
  while (first && second) {
    // the first will be the full linked list and second will be the reversed linked list, the second ll will become null first
    if (first.val != second.val) {
      return false;
    }
    first = first.next;
    second = second.next;
  }
  reverse(newHead); // we reset it again at the end
  return true;
};
