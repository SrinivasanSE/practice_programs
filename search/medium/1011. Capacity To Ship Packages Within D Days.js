// https://leetcode.com/problems/capacity-to-ship-packages-within-d-days/description/

/*
Brute
O((sum - max + 1)*n) & O(1)

*/



const totalDays = (arr, capacity, n) => {
    let days = 1
    let load = 0
    for(let i = 0; i < n; i++) {
       if (load + arr[i] > capacity) {
        load = arr[i]
        days++
       } else {
        load += arr[i]
       }
    }

    return days
}
var shipWithinDays = function(weights, days) {
    const n = weights.length
    let l = Math.max(...weights)
    let r = weights.reduce((accum, curr) => accum + curr, 0)

    for(let i = l; i <= r; i++) {
        let daysTaken = totalDays(weights, i, n)
        if (daysTaken <= days) {
            return i
        }
    }
};

/*
Optimal - Binary search
O(log(sum - max + 1)* n)

*/


var shipWithinDays = function(weights, days) {
    const n = weights.length
    let l = Math.max(...weights)
    let r = weights.reduce((accum, curr) => accum + curr, 0)

    while (l <= r) {
        const mid = l + Math.floor((r - l)/2)
        let daysTaken = totalDays(weights, mid, n)
        if (daysTaken <= days) {
            r = mid - 1
        } else {
            l = mid + 1
        }
    }

    return l
};