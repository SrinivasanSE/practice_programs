// https://www.geeksforgeeks.org/merge-k-sorted-arrays/

// Divide and conquer algo based sol is there

class PriorityQueue {
  constructor(func) {
    this.heap = [];
    this.compare = func;
  }

  enqueue(data) {
    this.heap.push(data);
    this.bubbleUp();
  }

  bubbleUp() {
    let index = this.heap.length - 1;
    let parent;
    const arr = this.heap;
    while (index > 0) {
      parent = Math.floor((index - 1) / 2);
      if (this.compare(arr[index], arr[parent]) < 0) {
        [arr[parent], arr[index]] = [arr[index], arr[parent]];
        index = parent;
      } else {
        break;
      }
    }
  }

  dequeue() {
    if (this.heap.length === 0) return;
    if (this.heap.length === 1) return this.heap.pop();

    const val = this.heap[0];
    this.heap[0] = this.heap.pop();
    this.heapify(0);
    return val;
  }

  heapify(index) {
    let curr = index;
    const left = 2 * index + 1;
    const right = 2 * index + 2;
    const n = this.heap.length;
    const arr = this.heap;
    if (left < n && this.compare(arr[left], arr[curr]) < 0) {
      curr = left;
    }

    if (right < n && this.compare(arr[right], arr[curr]) < 0) {
      curr = right;
    }

    if (curr != index) {
      [arr[curr], arr[index]] = [arr[index], arr[curr]];
      this.heapify(curr);
    }
  }

  isEmpty() {
    return this.heap.length === 0;
  }
}

const compare = (a, b) => {
  return a.data - b.data;
};

class Solution {
  mergeKArrays(arr, K) {
    const heap = new PriorityQueue(compare);
    for (let i = 0; i < arr.length; i++) {
      heap.enqueue({ data: arr[i][0], index: 0, arrIdx: i });
    }
    let ans = [];
    while (!heap.isEmpty()) {
      const { index, data, arrIdx } = heap.dequeue();
      ans.push(data);

      if (index + 1 < arr[arrIdx].length) {
        heap.enqueue({
          data: arr[arrIdx][index + 1],
          index: index + 1,
          arr: arrIdx,
        });
      }
    }

    return ans;
  }
}
