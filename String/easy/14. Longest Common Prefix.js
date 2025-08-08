// https://leetcode.com/problems/longest-common-prefix/description/


/*
Brute
O(N*LogN*M) N is num of strings and M is the num of characters for sorting & O(1)
*/


var longestCommonPrefix = function (strs) {
    let str = ""
    const n = strs.length 
    if (n === 1) return strs[0]
    strs.sort() /*
    The longest common prefix of the entire array must be a prefix of both the first and last strings after sorting.

This is because sorting brings the most dissimilar strings to the extremes.
*/
    let first = strs[0]
    let last = strs[n - 1]
    let i = 0
    while (i < first.length && i < last.length && first[i] === last[i]) {
        str += first[i]
        i++
    }

    return str

}

/*
Better - Horizontal Scanning
O(N*M) & O(1)
*/


var longestCommonPrefix = function (strs) {
    const n = strs.length 
    if (n === 1) return strs[0]

    let prefix = strs[0]

    for(let i = 1; i < n; i++) {
        while (strs[i].indexOf(prefix) !== 0) {
            prefix = prefix.slice(0, -1)
            if (prefix === "") return ""
        }
    }
    

    return prefix

}

/*
Better - Vertical Scanning
O(N*M) & O(1), in best case, it could be N*minLen in bestCase
*/

var longestCommonPrefix = function (strs) {
    const n = strs.length 
    if (n === 1) return strs[0]

    for(let i = 0; i < strs[0].length; i++) {
        for(let j = 1; j < n; j++) {
            if (i >= strs[j].length || strs[0][i] != strs[j][i]) {
                return strs[0].slice(0, i)
            }
        }
    }

    return strs[0]

}

/*
Better - Binary Search
O(logm) for binary search + O(N*M) for containsAll func, so in total, O(N*M*LogM) & O(1)

*/


const containsAll = (strs, left, right) => {
    for(let i = 1; i < strs.length; i++) { // N - 1 ~ N
        for(let j = left; j <= right; j++) { // this can be at max M only since low and high will be in the range of 0 to M
            if (strs[i][j] != strs[0][j]) {
                return false
            }
        }
    }

    return true

}
var longestCommonPrefix = function (strs) {
    const n = strs.length 
    if (n === 1) return strs[0]

    let minLen = strs[0].length

    for(let str of strs) {
        minLen = Math.min(minLen, str.length)// find the min length of the string and run binary search
    }

    let low = 0, high = minLen - 1

    while (low <= high) {
        const mid = low + Math.floor((high - low)/2)

        if (containsAll(strs, low , mid)) { // if the index from low to mid is same for all the strings, try for even bigger prefix
            low = mid + 1
        } else {
            high = mid - 1
        }
    }

    return strs[0].slice(0, low)

}