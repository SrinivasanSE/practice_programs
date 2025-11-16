// 


/*

Brute

O(n) & O(1)

*/


var maximumCount = function(nums) {
    let pos = 0, neg = 0
    for (let num of nums) {
        if (num > 0) pos++
        else if (num < 0) neg++
    }

    return Math.max(pos, neg)
};


/*

Optimal

O(logn) & O(1)

*/

// upperBound(nums, target, n)
// Returns the FIRST index where nums[index] > target
// (i.e., the count of elements <= target)
//
// Example: nums = [-3, -2, -1, 0, 2, 4]
// upperBound(nums, -1) → 3  (first index where value > -1 is nums[3] = 0)
//
// This is classic "upper bound" binary search.
const upperBound = (nums, target, n) => {
    let l = 0, r = n - 1, mid;

    while (l <= r) {
        mid = l + Math.floor((r - l) / 2);

        // If nums[mid] is strictly GREATER than target,
        // then this mid *might be the upper bound*, so move r left.
        if (target < nums[mid]) {
            r = mid - 1;
        }
        // Otherwise nums[mid] <= target,
        // so the upper bound MUST be to the right of mid.
        else {
            l = mid + 1;
        }
    }

    // When loop ends: 
    // l = first index where nums[l] > target
    return l;
};


var maximumCount = function(nums) {
    const n = nums.length;

    // Count of NEGATIVE numbers:
    // upperBound(nums, -1) gives the first index where nums[i] > -1.
    // Since negatives are <= -1, this index equals count of negatives.
    const neg = upperBound(nums, -1, n);

    // Count of POSITIVE numbers:
    // upperBound(nums, 0) gives first index where nums[i] > 0.
    // That means everything from that index to end are positives.
    // Count of positives = n - index.
    const pos = n - upperBound(nums, 0, n);

    // Return whichever count is larger.
    return Math.max(pos, neg);
};
