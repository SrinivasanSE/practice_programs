// https://leetcode.com/problems/median-of-two-sorted-arrays/description/

/*
Brute - Merge the arrays
O(n1 + n2) & O(n1 + n2)
*/


var findMedianSortedArrays = function(nums1, nums2) {
    let l = 0, r = 0, k = 0, n1 = nums1.length, n2 = nums2.length
    const arr = new Array(n1 + n2)
    while (l < n1 && r < n2) {
        if (nums1[l] <= nums2[r]) {
            arr[k] = nums1[l++]
        } else {
            arr[k] = nums2[r++]
        }
        k++
    }

    while (l < n1) {
        arr[k++] = nums1[l++]
    }

    while (r < n2) {
        arr[k++] = nums2[r++]
    }

    const n = arr.length
    if (n % 2 === 0) {
        return (arr[n/2] + arr[n/2 - 1])/2
    }

    return arr[Math.floor(n/2)]
};


/*
Better - Find the required two elements alone
O(n1 + n2) & O(1)

*/


var findMedianSortedArrays = function (nums1, nums2) {
    let l = 0, r = 0, k = 0, n1 = nums1.length, n2 = nums2.length
    const n = n1 + n2
    let curr = 0, prev = 0
    for(let i = 0; i <= Math.floor(n/2); i++) {
        prev = curr

        if (l < n1 && r < n2) {
            curr = nums1[l] <= nums2[r] ? nums1[l++] : nums2[r++]
        } else if (l < n1) {
            curr = nums1[l++]
        } else {
            curr = nums2[r++]
        }
    }

    return n % 2 === 1 ? curr : (curr + prev) /2

};


/*
Optimal - Binary search
O(log(min(n1, n2))) & O(1)
*/

var findMedianSortedArrays = function (nums1, nums2) {
    const n1 = nums1.length, n2 = nums2.length

    if (n1 > n2) {
        return findMedianSortedArrays(nums2, nums1) // we should do binary search on the smallest array to reduce time complexity
    }

    const n = n1 + n2
    const left = Math.floor((n + 1)/2) // to find how many elements should be in the left side, for odd elements, left will have one extra element and for even, both will have same
    let low = 0, high = n1

    while(low <= high) {
        const mid1 = low + Math.floor((high - low)/2)
        const mid2 = left - mid1

        let l1 = Number.MIN_SAFE_INTEGER, l2 = Number.MIN_SAFE_INTEGER
        let r1 = Number.MAX_SAFE_INTEGER, r2 = Number.MAX_SAFE_INTEGER

        if (mid1 < n1) r1 = nums1[mid1]
        if (mid2 < n2) r2 = nums2[mid2]

        if (mid1 - 1 >= 0) l1 = nums1[mid1 - 1]
        if (mid2 - 1 >= 0) l2 = nums2[mid2 - 1]

        if (l1 <= r2 && l2 <= r1) {
            if (n % 2 === 1) return Math.max(l1, l2)
            return (Math.max(l1, l2) + Math.min(r1, r2))/2
        }

        if (l1 > r2) { // that means we need to reduce the no of elements in the left side from first array to make it smaller
            high = mid1 - 1
        } else { // l2 > r1 - we need to increase the no of elements on the left side, so that right side first element from the first array will be larger
            low = mid1 + 1
        }
    }

};

/*
l2 > r1
There is at least one element (l2) on the left that is bigger than an element (r1) on the right.
This means the cut in a is too far to the left (we have not included enough large elements from a in the left partition).
So, we need to move the cut in a to the right (increase mid1), so the left side of a includes more (and possibly larger) elements.
*/