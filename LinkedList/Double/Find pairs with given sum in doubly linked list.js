// https://www.geeksforgeeks.org/problems/find-pairs-with-given-sum-in-doubly-linked-list/1

class Solution {
  // Function to find pairs in the linked list with the given sum
  findPairsWithGivenSum(head, target) {
    // code here
    let pairs = [];

    let right = head;
    let curr = head;
    while (curr.next) {
      curr = curr.next;
    }
    right = curr;
    let left = head;
    while (left.data < right.data) {
      let sum = left.data + right.data;
      if (sum === target) {
        pairs.push([left.data, right.data]);
        left = left.next;
        right = right.prev;
      } else if (sum < target) {
        left = left.next;
      } else {
        right = right.prev;
      }
    }

    return pairs;
  }
}
