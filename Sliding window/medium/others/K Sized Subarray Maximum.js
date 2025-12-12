// https://www.geeksforgeeks.org/sliding-window-maximum-maximum-of-all-subarrays-of-size-k/

/*

Brute

O(n*k) & O(n)

*/

class Solution {
  maxOfSubarrays(arr, k) {
    // code here
    const n = arr.length;

    if (n < k) {
      return;
    }
    let out = [];
    let max;
    for (let i = 0; i < n - k + 1; i++) {
      max = 0;
      for (let j = 0; j < k; j++) {
        max = Math.max(max, arr[i + j]);
      }

      out.push(max);
    }
    return out;
  }
}

/*

Better - Max Heap

O(n*logk) & O(k)

*/

class Solution {
  maxOfSubarrays(arr, k) {
    // code here
    const n = arr.length;

    if (n < k) {
      return;
    }

    let out = [];
    const pq = new PriorityQueue(compare);
    for (let i = 0; i < k; i++) {
      pq.enqueue({ value: arr[i], index: i });
    }
    out.push(pq.getTop().value);
    for (let i = k; i < n; i++) {
      pq.enqueue({ value: arr[i], index: i });
      while (pq.getTop().index <= i - k) {
        // pop all the elements outside the window
        pq.dequeue();
      }

      out.push(pq.getTop().value); // add the top element in the heap
    }

    return out;
  }
}

/*

Optimal - Dequeue

O(n) & O(k)

*/

class Solution {
  maxOfSubarrays(arr, k) {
    // code here
    const n = arr.length;

    if (n < k) {
      return;
    }

    let out = [];

    const dequeue = []; // will be in decreasing order

    for (let i = 0; i < n; i++) {
      
      // We keep popping elements from the dequeue till we find an element greater than the current element
      while (dequeue.length > 0 && arr[dequeue[dequeue.length - 1]] <= arr[i]) {
        dequeue.pop();
      }

      dequeue.push(i); // we push the current element

      if (dequeue[0] <= i - k) { // if the element at the front is out of the window, we remove it
        dequeue.shift();
      }

      if (i >= k - 1) { // only start adding to the out array when we reach the k - 1 index
        out.push(arr[dequeue[0]]);
      }
    }

    return out;
  }
}
