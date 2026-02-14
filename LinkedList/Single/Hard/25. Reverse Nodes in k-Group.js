// https://leetcode.com/problems/reverse-nodes-in-k-group/description/

/*

Total work
= (number of groups) × (work per group)
= (n / k) × O(k)
= O(n)

SC - O(1)
*/


var reverseKGroup = function (head, k) {
  if (k === 1) return head;
  let curr = head,
    kthNode,
    nextNode,
    prevNode;

  while (curr) { // run for n/k times
    kthNode = getKthNode(curr, k);
    if (!kthNode) {
      if (prevNode) prevNode.next = curr;
      break;
    }
    nextNode = kthNode.next; // getting the head of the next group node
    kthNode.next = null;
    reverse(curr); // after reversal, kthNode will be become the head and curr will become the tail
    if (curr === head) {
      // for the first group alone, this will trigger
      head = kthNode;
    } else {
      prevNode.next = kthNode; // we link the previous group with the new reversed group
    }
    prevNode = curr;
    curr = nextNode;
  }

  return head;
};


const reverse = (head) => {
  let curr = head,
    prev = null,
    next;
  while (curr) {
    next = curr.next;
    curr.next = prev;
    prev = curr;
    curr = next;
  }

  return prev;
};

const getKthNode = (node, k) => {
  k--;
  let curr = node;
  while (k > 0 && curr) {
    curr = curr.next;
    k--;
  }

  return curr;
};