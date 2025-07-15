// https://leetcode.com/problems/merge-intervals/description/

/*
Input: intervals = [[1,3],[2,6],[8,10],[15,18]]
Output: [[1,6],[8,10],[15,18]]
Explanation: Since intervals [1,3] and [2,6] overlap, merge them into [1,6].

Example 2:

Input: intervals = [[1,4],[4,5]]
Output: [[1,5]]
Explanation: Intervals [1,4] and [4,5] are considered overlapping.

*/

/*

Brute Force - Two loops
O(nlogn) + O(2n) & O(n)

*/

/**
 * @param {number[][]} intervals
 * @return {number[][]}
 */
var merge = function(intervals) {
    const n = intervals.length
    intervals.sort((a, b) => a[0] - b[0])
    let res = [], start, end

    for(let i = 0; i < n; i++) {
        start = intervals[i][0]
        end = intervals[i][1]

        if (res.length > 0 && res[res.length - 1][1] >= end) { // if the interval is already added, we skip it. [2, 3] is already included in [1, 6]
            continue
        }

        for(let j = i + 1; j < n; j++) {
            if (end >= intervals[j][0]) { // [1, 3]  & [2, 6] 3 >= 2, so we merge those two
                end = Math.max(end, intervals[j][1])
            } else {
                break // since the array is sorted, there won't be any overlap anymore,  we can break here
            }
        }

        res.push([start, end])
    }

    return res

};


/*

Optimal
O(nlogn) & O(n)

*/

var merge = function(intervals) {
    const n = intervals.length
    intervals.sort((a, b) => a[0] - b[0])
    let res = []

    for(let i = 0; i < n; i++) {
       if (!res.length || res[res.length - 1][1] < intervals[i][0] ) { // [1, 6], [8, 10] 6 < 8, that means it's not overlapping, so we add a new one
        res.push(intervals[i])
       } else {
        res[res.length - 1][1] = Math.max(res[res.length - 1][1], intervals[i][1]) // There is overlap start of the current interval with the end of the last one in result arr, we take max of current interval's end and current res end
       }
    }
    return res
};