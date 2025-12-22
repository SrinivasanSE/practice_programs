// https://leetcode.com/problems/non-overlapping-intervals/description/

// Similar to n meetings in one room problem.


/*

Optimal

O(nlogn) & O(1)

*/


var eraseOverlapIntervals = function(intervals) {
    const n = intervals.length
    let i = 0, count = 0, last = null
    intervals.sort((a, b) => a[1] - b[1])
    while (i < n) { // we calculate the maximum number of non-overlapping intervals that can be kept
        if (last == null || last <= intervals[i][0]) { // we count the no of non overlapping interval
            count++
            last = intervals[i][1]
        }
        i++
    }

    return n - count // gives count of overlapping interval
};


/*

Removing the minimum number of intervals

is the same as

Keeping the maximum number of non-overlapping intervals

Think of it this way:

Once two intervals overlap, you can’t keep both.

Which one should you drop?
→ The one that ends later, because it blocks more future intervals.

So by always picking the interval that ends earliest,
you leave maximum available time for future intervals → globally optimal.

*/