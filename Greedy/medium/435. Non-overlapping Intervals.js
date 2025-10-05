// https://leetcode.com/problems/non-overlapping-intervals/description/

// Similar to n meetings in one room problem.


/*

Optimal

O(nlogn) & O(1)

*/


var eraseOverlapIntervals = function(intervals) {
    intervals.sort((a, b) => a[1] - b[1]) // sort by end time to maximize non overlapping intervals
    let count = 0
    let lastEnd = intervals[0][1], interval
    const n = intervals.length
    for (let i = 1; i < n; i++) {
        interval = intervals[i]
        if (lastEnd <= interval[0]) { // we use = here since it's considered as non overlapping in this problem.
            lastEnd = interval[1]
        } else { // counts the overlapping intervals
            count+=1
        }
    }

    return count
};


/*

Think of it this way:

Once two intervals overlap, you can’t keep both.

Which one should you drop?
→ The one that ends later, because it blocks more future intervals.

So by always picking the interval that ends earliest,
you leave maximum available time for future intervals → globally optimal.

*/