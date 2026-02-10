// https://www.geeksforgeeks.org/k-th-element-two-sorted-arrays/'

// Similar to /search/hard/4. Median of Two Sorted Arrays.js

/*
Brute - merge approach of merge sort
O(n1 + n2) & O(n1 + n2)
*/

/*
Better
O(k) & O(1)
*/

class Solution {
  kthElement(a, b, k) {
    // code here
    let curr = -1;
    let l = 0,
      r = 0,
      n1 = a.length,
      n2 = b.length;
    for (let i = 0; i < k; i++) {
      if (l < n1 && r < n2) {
        curr = a[l] <= b[r] ? a[l++] : b[r++];
      } else if (l < n1) {
        curr = a[l++];
      } else {
        curr = b[r++];
      }
    }

    return curr;
  }
}

/*
Optimal - Binary search
O(log(min(n1, n2))) & O(1)
*/

class Solution {
  kthElement(a, b, k) {
    // code here
    const n1 = a.length,
      n2 = b.length;
    if (n1 > n2) return this.kthElement(b, a, k);
    const left = k; // k elements will be in the left
    let low = Math.max(0, k - n2), // if k is higher like 7 and n2 is 5, we can't take 0 elements from arr1, we need to take atleast 7 - 5 = 2 elements
      high = Math.min(k, n1); // we don't have to take more than k or n1 elements from arr1

    while (low <= high) {
      const mid1 = low + Math.floor((high - low) / 2);
      const mid2 = left - mid1;

      let l1 = Number.MIN_SAFE_INTEGER,
        l2 = Number.MIN_SAFE_INTEGER;
      let r1 = Number.MAX_SAFE_INTEGER,
        r2 = Number.MAX_SAFE_INTEGER;

      if (mid1 < n1) r1 = a[mid1];
      if (mid2 < n2) r2 = b[mid2];

      if (mid1 - 1 >= 0) l1 = a[mid1 - 1];
      if (mid2 - 1 >= 0) l2 = b[mid2 - 1];
      if (l1 <= r2 && l2 <= r1) {
        return Math.max(l1, l2);
      }

      if (l1 > r2) {
        high = mid1 - 1;
      } else {
        low = mid1 + 1;
      }
    }
  }
}

/*
Why These Bounds?
low = Math.max(0, k - n2)

We can't take fewer than 0 elements from a.
But: If k is larger than n2, we must take at least k - n2 elements from a (because b doesn't have enough elements to contribute to the first k).
So, low is the maximum of 0 and k - n2.

Example:

If k = 5, n2 = 3, then k - n2 = 2. So, we must take at least 2 elements from a (since b can only provide 3 elements).


high = Math.min(k, n1)

We can't take more than n1 elements from a (as that's all it has).
We can't take more than k elements from a (since we only want the first k elements in total).
So, high is the minimum of k and n1.

Example:

If k = 5, n1 = 3, then high = 3 (can't take more than 3 from a).

*/
