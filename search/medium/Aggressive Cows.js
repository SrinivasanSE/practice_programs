// https://www.geeksforgeeks.org/problems/aggressive-cows/1

/*
Brute
O(NlogN) + O(N *(max(stalls[])-min(stalls[]))) & O(1)
*/


class Solution {
    // Function to solve the problem.
    isPossible(arr, distance, k, n) {
        let prev = arr[0]
        k -= 1
        for (let i = 1; i < n; i++) {
            if (arr[i] - prev >= distance) {
                k--
                prev = arr[i]
            }
            if (k === 0) {
                return true
            }
        }

        return false
    }
    aggressiveCows(stalls, k) {
        // your code here
        const n = stalls.length
        stalls.sort((a, b) => a - b)
        let l = 1, r = stalls[n - 1] - stalls[0]

        for (let i = l; i <= r; i++) {
            if (!this.isPossible(stalls, i, k, n)) {
                return i - 1
            }
        }
        return r
    }
}


/*
Optimal
O(NlogN) + O(N *log(max(stalls[])-min(stalls[]))) & O(1)

*/

class Solution {
    // Function to solve the problem.
    isPossible(arr, dist, k) {
        let count = 1, last = arr[0]
        for (let i = 1; i < arr.length; i++) {
            if (arr[i] - last >= dist) {
                count++
                last = arr[i]
            }
        }

        return count >= k
    }
    aggressiveCows(stalls, k) {
        // your code here
        const n = stalls.length
        stalls.sort((a, b) => a - b)
        let l = 1, r = stalls[n - 1] - stalls[0]  // l will be min diff btw two items and r will be max diff btw smallest and largest

        while (l <= r) {
            const mid = l + Math.floor((r - l) / 2)
            if (this.isPossible(stalls, mid, k)) { // we need to increase the min distance
                l = mid + 1
            } else {
                r = mid - 1
            }
        }
        return r
    }
}