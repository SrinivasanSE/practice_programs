// https://leetcode.com/problems/insert-interval/description/

// Similar to 56. Merge Interval


/*

Better - Binary search

O(N + logN) & O(N)

*/

const findIndex = (intervals, n, target) => {
    let l = 0, r = n - 1, mid

    while (l <= r) {
        mid = l + Math.floor((r - l)/2)

        if (intervals[mid][0] < target) { // compare the start with new interval start
            l = mid + 1
        } else {
            r = mid - 1
        }
    }

    return l
}

const mergeIntervals = (intervals, n) => { // same as 56. problem
    let i = 0
    const res = []
    while (i < n) {
        if (!res.length || res[res.length - 1][1] < intervals[i][0]) {
            res.push(intervals[i])
        } else {
            res[res.length - 1][1] = Math.max(res[res.length - 1][1], intervals[i][1])
        }
        i++
    }


    return res
}

var insert = function (intervals, newInterval) {

    const n = intervals.length
    const target = newInterval[0]
    
    const index = findIndex(intervals, n, target) // find the position to insert the new interval
    intervals.splice(index, 0, newInterval) // add the new interval at the correct position
    return mergeIntervals(intervals, n + 1) // merge the overlapping intervals
}


/*

Optimal

O(n) & O(1)

*/


var insert = function (intervals, newInterval) {

    const res = []
    const n = intervals.length
    
    let i = 0

    while (i < n && intervals[i][1] < newInterval[0]) { // find the left non overlapping intervals
        res.push(intervals[i])
        i++
    }

    while (i < n && intervals[i][0] <= newInterval[1]) { // these intervals must be overlapping, compare start with new interval's end and keep upadting the new interval
        newInterval[0] = Math.min(intervals[i][0], newInterval[0]) // take the min of start
        newInterval[1] = Math.max(intervals[i][1], newInterval[1]) // take the max of end
        i++
    }
    res.push(newInterval) // push the merged interval

    while (i < n) { // push the nom overlapping intervals in the right side
        res.push(intervals[i])
        i++
    }
       
    return res
};