// https://www.geeksforgeeks.org/dsa/minimize-the-maximum-distance-between-adjacent-points-after-adding-k-points-anywhere-in-between/

/*
Brute
O(k*n) + O(n) & O(n)
*/

class Solution {
  findSmallestMaxDist(stations, k) {
    // code here
    const n = stations.length;
    let maxGap, maxIdx;
    let slots = new Array(n - 1).fill(0);
    for (let i = 0; i < k; i++) {
      ((maxGap = -1), (maxIdx = -1));
      for (let j = 0; j < n - 1; j++) {
        let gap = stations[j + 1] - stations[j];
        let sectionLength = gap / (slots[j] + 1);

        if (maxGap < sectionLength) {
          maxGap = sectionLength;
          maxIdx = j;
        }
      }
      slots[maxIdx]++;
    }
    maxGap = -1;
    for (let i = 0; i < n - 1; i++) {
      let gap = stations[i + 1] - stations[i];
      let sectionLength = gap / (slots[i] + 1);
      maxGap = Math.max(maxGap, sectionLength);
    }

    return maxGap;
  }
}

/*
Better - Using max heap
O(nlogn + klogn) & O(n - 1) & O(n - 1) for heap and slots arr

*/

class Solution {
  findSmallestMaxDist(stations, k) {
    // code here
    const n = stations.length;
    if (n === 1) return 0; // base condition is important
    let maxGap = -1;
    let slots = new Array(n - 1).fill(0);
    const heap = new MaxHeap();
    for (let i = 0; i < n - 1; i++) {
      heap.push({ priority: stations[i + 1] - stations[i], index: i });
    }
    for (let i = 0; i < k; i++) {
      maxGap = heap.pop();
      slots[maxGap.index]++; // we add the station to this slot
      let newOne =
        (stations[maxGap.index + 1] - stations[maxGap.index]) /
        (slots[maxGap.index] + 1); // find the new gap after adding a station
      heap.push({ priority: newOne, index: maxGap.index });
    }
    return heap.getTop().priority;
  }
}

/*
Optimal - Binary search
O(n*log(Len)) + O(n), Len = length of the answer space (high - low)
*/

/*
Gap: 12 - 0 = 12
numberInBetween = Math.floor(12 / 4) = 3
12 === 4 * 3? Yes (12 = 12)
So, cnt += 3 - 1 = 2

Where would you put the stations?

Segments: 0 → 4 → 8 → 12
(You add stations at 4 and 8)

*/

class Solution {
  isPossible(arr, k, dist, n) {
    let count = 0;
    for (let i = 1; i < n; i++) {
      let noOfStations = Math.floor((arr[i] - arr[i - 1]) / dist);
      if (arr[i] - arr[i - 1] === dist * noOfStations) {
        count += noOfStations - 1;
      } else {
        count += noOfStations;
      }
    }

    return count <= k;
  }
  findSmallestMaxDist(stations, k) {
    // code here
    let low = 0;
    let limit = 1e-6;
    let high = -1;
    const n = stations.length;
    for (let i = 0; i < n - 1; i++) {
      high = Math.max(stations[i + 1] - stations[i], high);
    }
    while (high - low > limit) {
      const mid = (low + high) / 2.0; // only this will work, don't use l + math.floor(r - l)/2
      if (this.isPossible(stations, k, mid, n)) {
        // if possible, move to left because we need to minimise the gap
        high = mid;
      } else {
        // if more stations can be placed at this mid, move to right to reduce the stations to less than or equal to k
        low = mid;
      }
    }

    return high;
  }
}
