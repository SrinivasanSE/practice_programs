// https://www.geeksforgeeks.org/merge-k-sorted-linked-lists-set-2-using-min-heap/
// https://leetcode.com/problems/merge-k-sorted-lists/description/

// LinkedList/Single/Medium/Merge K sorted linked lists.js

/*

O(NLogk) & O(k)

where k is the number of linked lists and N is the total no of nodes. Each node is inserted/extracted once, Each is O(log k) because the heap contains at most k elements at any time.

*/

class MinHeap {
  constructor() {
    this.heap = [];
  }

  getParentIndex(i) {
    return Math.floor((i - 1) / 2);
  }
  getLeftChildIndex(i) {
    return 2 * i + 1;
  }
  getRightChildIndex(i) {
    return 2 * i + 2;
  }

  swap(i, j) {
    [this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]];
  }

  insert(value) {
    this.heap.push(value);
    this.heapifyUp(this.heap.length - 1);
  }

  heapifyUp(index) {
    while (index > 0) {
      let parent = this.getParentIndex(index);
      if (this.heap[parent].data > this.heap[index].data) {
        this.swap(parent, index);
        index = parent;
      } else {
        break;
      }
    }
  }

  heapifyDown(index) {
    let smallest = index;
    let left = this.getLeftChildIndex(index);
    let right = this.getRightChildIndex(index);

    if (
      left < this.heap.length &&
      this.heap[left].data < this.heap[smallest].data
    )
      smallest = left;

    if (
      right < this.heap.length &&
      this.heap[right].data < this.heap[smallest].data
    )
      smallest = right;

    if (smallest !== index) {
      this.swap(index, smallest);
      this.heapifyDown(smallest);
    }
  }

  extractMin() {
    if (this.heap.length === 0) return null;
    if (this.heap.length === 1) return this.heap.pop();

    const min = this.heap[0];
    this.heap[0] = this.heap.pop();
    this.heapifyDown(0);
    return min;
  }

  size() {
    return this.heap.length;
  }

  isEmpty() {
    return this.heap.length === 0;
  }
}

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
