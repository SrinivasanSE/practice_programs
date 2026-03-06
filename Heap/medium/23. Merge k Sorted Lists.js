// https://www.geeksforgeeks.org/merge-k-sorted-linked-lists-set-2-using-min-heap/
// https://leetcode.com/problems/merge-k-sorted-lists/description/

// LinkedList/Single/Medium/Merge K sorted linked lists.js

/*

O(NLogk) & O(k)

where k is the number of linked lists and N is the total no of nodes. Each node is inserted/extracted once, Each is O(log k) because the heap contains at most k elements at any time.

*/

class Solution {
  // Function to merge K sorted linked list.
  mergeKLists(arr) {
    // your code here
    const heap = new MinHeap();
    for (let list of arr) {
      heap.insert(list); // this will be just the head of the linked list
    }
    const dummy = new Node(-1);
    let temp = dummy;
    while (!heap.isEmpty()) {
      const curr = heap.extractMin();
      temp.next = curr;
      temp = temp.next;
      if (curr.next) {
        heap.insert(curr.next);
      }
    }

    return dummy.next;
  }
}
