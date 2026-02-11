// https://leetcode.com/problems/minimum-common-value/description/

/*

Brute - Using hashmap

O(n + m) & O(m)

*/


var getCommon = function(nums1, nums2) {
    let set = new Set(nums2)
    for (let num of nums1) {
        if (set.has(num)) return num
    }

    return -1
};


/*

Better - Using binary search

If one of the arrays is very large relative to the other, binary search approach will be more efficient

O(nlog(m)) & O(1)


*/


var getCommon = function(nums1, nums2) {
    const n1 = nums1.length, n2 = nums2.length
    if (n1 > n2) return getCommon(nums2, nums1)
    let idx
    for (let num of nums1) {
        idx = binarySearch(nums2, n2, num)
        if (idx != -1) return num
    }

    return -1

};


/*

Optimal - Two pointers

O(min(n, m)) & O(1)

*/


var getCommon = function(nums1, nums2) { // sorted arr is given
    const n1 = nums1.length, n2 = nums2.length
    let l = 0, r = 0

    while (l < n1 && r < n2) {
        if (nums1[l] === nums2[r]) {
            return nums1[l]
        }

        if (nums1[l] < nums2[r]) {
            l++
        } else {
            r++
        }
    }

    return -1

};


/*

If one of the arrays is very large relative to the other, binary search approach will be more efficient

hen n = m = 10^5, we can have:
2 * 10^5 comparisons, in two pointers approach,
10^5 * log(10^5) ~= 17 * 10^5 comparisons, in binary search.
Thus, when n and m have similar lengths, two pointers approach will generally perform better.

But, when m is significantly larger than n (say at least 10x), binary search outperforms it. E.g.:
n = 100, m = 1000 => 1100 comparisons in two pointers approach,
100 * log(1000) ~= 100 * 10 = 1000 comparisons in binary search.


*/