// https://www.geeksforgeeks.org/find-k-closest-elements-given-value/

// Add Binary search approach

// This sol is not working, correct this

const compare = (a, b) => {
  if (a.diff != b.diff) return b.diff - a.diff;

  return a.value - b.value;
};

class Solution {
  printKClosest(arr, n, k, x) {
    // code here
    const heap = new PriorityQueue(compare);

    let res = [];

    for (let i = 0; i < n; i++) {
      if (arr[i] === x) {
        continue;
      }
      heap.enqueue({ diff: Math.abs(x - arr[i]), value: arr[i] });

      if (heap.size() > k) {
        heap.dequeue();
      }
    }
    while (!heap.isEmpty()) {
      res.push(heap.dequeue().value);
    }

    return res.reverse();
  }
}
