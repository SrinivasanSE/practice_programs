// https://www.geeksforgeeks.org/add-two-numbers-represented-by-linked-list/
// https://leetcode.com/problems/add-two-numbers/description/

/*
Time Complexity: O(m + n), where m and n are the sizes of input linked list.
Auxiliary Space: O(max(m, n)), as we create a new linked list to store the sum of two linked lists
*/

var addTwoNumbers = function (l1, l2) {
  const dummy = new ListNode(-1);
  let sumList = dummy;

  let c1 = l1,
    c2 = l2,
    carry = 0,
    sum = 0,
    newNode;

  while (c1 || c2) {
    sum = carry;
    if (c1) sum += c1.val;
    if (c2) sum += c2.val;

    newNode = new ListNode(sum % 10);
    carry = Math.floor(sum / 10);
    sumList.next = newNode;
    sumList = sumList.next;

    if (c1) c1 = c1.next;
    if (c2) c2 = c2.next;
  }

  if (carry === 1) {
    newNode = new ListNode(1);
    sumList.next = newNode;
  }

  return dummy.next;
};

/*
Time Complexity: O(m + n), where m and n are the sizes of input linked list.
Auxiliary Space: O(1), as no extra linked list is used to store the sum.
*/

// we store the ans in the longest num list itself and reverse it to get the ans



const getLength = (node) => {
  let curr = node,
    count = 0;
  while (curr) {
    curr = curr.next;
    count++;
  }

  return count;
};
var addTwoNumbers = function (l1, l2) {
  let carry = 0;

  let n1 = getLength(l1);
  let n2 = getLength(l2);

  if (n1 < n2) {
    return addTwoNumbers(l2, l1);
  }
  const head = l1;
  while (l2 || carry) {
    l1.val += carry;
    if (l2) {
      l1.val += l2.val;
      l2 = l2.next;
    }

    carry = Math.floor(l1.val / 10);
    l1.val %= 10;

    if (!l1.next && carry) {
      l1.next = new ListNode(0);
      break
    }

    l1 = l1.next;
  }

  return head;
};
