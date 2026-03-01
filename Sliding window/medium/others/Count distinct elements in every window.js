// https://www.geeksforgeeks.org/count-distinct-elements-in-every-window-of-size-k/

class Solution {
  countDistinct(arr, k) {
    // code here
    const map = new Map();
    const res = [];
    let left = 0;
    const n = arr.length;

    for (let right = 0; right < n; right++) {
      map.set(arr[right], (map.get(arr[right]) || 0) + 1);

      if (right >= k - 1) {
        res.push(map.size);
        map.set(arr[left], map.get(arr[left]) - 1);
        if (map.get(arr[left]) == 0) map.delete(arr[left]);
        left++;
      }
    }

    return res;
  }
}
