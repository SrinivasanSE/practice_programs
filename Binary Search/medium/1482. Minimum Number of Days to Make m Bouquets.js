// https://leetcode.com/problems/minimum-number-of-days-to-make-m-bouquets/description/

/*
Brute force
O((max(arr[])-min(arr[])+1) * N) & O(1)
*/


var minDays = function(bloomDay, m, k) {
    const n = bloomDay.length
    if (m*k > n) {
        return -1
    }
    let l = Math.min(...bloomDay)
    let r = Math.max(...bloomDay)

    for(let i = l; i <= r; i++) {
        if (isPossible(bloomDay, i, n, m, k)) {
            return i
        }
    }

    return -1
};


/*
Optimal - binary search
O(n*log(max - min + 1)) & O(1)
*/

const isPossible = (arr, day, n, m, k) => {
    let count = 0, totalBoq = 0
    for(let i = 0; i < n; i++) {
        if (arr[i] <= day) {
            count++
        } else {
            totalBoq += Math.floor(count/k)
            count = 0
        }
    }
    totalBoq += Math.floor(count/k)
    return totalBoq >= m
}
var minDays = function(bloomDay, m, k) {
    const n = bloomDay.length
    if (m*k > n) {
        return -1
    }
    let l = Math.min(...bloomDay)
    let r = Math.max(...bloomDay) // the range could be from min to max only, since it takes min days to get flowers

    while (l <= r) {
        const mid = l + Math.floor((r - l)/2)
        if (isPossible(bloomDay, mid, n, m, k)) { // if we can make more boq than m using this mid days, we can try to move to left to see if we can use less no of days
            r = mid - 1
        } else {
            l = mid + 1
        }
    }

    return l
};