// https://www.geeksforgeeks.org/count-pairs-two-linked-lists-whose-sum-equal-given-value/

// O(n1*logn1) + O(n2*logn2) & O(1)
function countPairs(head1, head2, x) {
  let count = 0;

  // sort head1 in ascending order and
  // head2 in descending order
  // sort (head1), sort (head2)
  // For simplicity both lists are considered to be
  // sorted in the respective orders

  // traverse both the lists from left to right
  while (head1 != null && head2 != null) {
    // if this sum is equal to 'x', then move both
    // the lists to next nodes and increment 'count'
    if (head1.data + head2.data == x) {
      head1 = head1.next;
      head2 = head2.next;
      count++;
    }
    // if this sum is greater than x, then
    // move head2 to next node
    else if (head1.data + head2.data > x) head2 = head2.next;
    // else move head1 to next node
    else head1 = head1.next;

    // required count of pairs
  }
  return count;
}

// O(n + m) & O(n)
class Solution {
  countPairs(head1, head2, x) {
    // your code here
    let count = 0;
    let us = new Set();

    // Insert all the elements of 1st list
    // in the hash table(unordered_set 'us')
    while (head1 != null) {
      us.add(head1.data);

      // Move to next node
      head1 = head1.next;
    }

    // For each element of 2nd list
    while (head2 != null) {
      // Find (x - head2.data) in 'us'
      if (us.has(x - head2.data)) count++;

      // Move to next node
      head2 = head2.next;
    }

    // Required count of pairs
    return count;
  }
}
