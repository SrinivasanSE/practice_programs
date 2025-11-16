// https://leetcode.com/problems/special-array-with-x-elements-greater-than-or-equal-x/description/


/*

Brute - Binary Search

O(nlogn) & O(1)

*/


// Finds the first index where nums[i] >= target
// This is a standard upper-bound implementation.
const upperBound = (nums, target) => {
    let l = 0, h = nums.length - 1, mid

    while (l <= h) {
        mid = l + Math.floor((h - l) / 2)

        // If nums[mid] is >= target, move left to find first such index
        if (nums[mid] >= target) {
            h = mid - 1
        } else {
            // Otherwise move right
            l = mid + 1
        }
    }

    // l ends at the first index where nums[i] >= target
    return l
}


var specialArray = function (nums) {
    nums.sort((a, b) => a - b)   // Sort ascending to use upperBound
    const n = nums.length

    // Binary-search possible x values between 1 and n
    let l = 1, r = n, mid, count

    while (l <= r) {
        mid = l + Math.floor((r - l) / 2)   // Candidate x

        // Count how many numbers are >= mid
        // Since array is sorted, this is: n - index_of_first(nums[i] >= mid)
        count = n - upperBound(nums, mid)

        // If exactly mid numbers are >= mid → special value found
        if (mid === count) return mid

        // If too many numbers are >= mid, we need a larger mid
        if (mid < count) {
            l = mid + 1
        } else {
            // If too few numbers are >= mid, reduce mid
            r = mid - 1
        }
    }

    return -1   // No special x found
};




/*

Better

O(nlogn) & O(1)

*/

var specialArray = function(nums) {
    nums.sort((a, b) => a - b)    // Sort ascending
    const n = nums.length
   
    // Try every possible x between 1 and n (max possible)
    for (let x = 1; x <= n; x++) {

        // The x largest numbers start at index n-x
        // nums[n - x] is the x-th largest value

        // Check: at least x numbers >= x
        const atLeastX = nums[n - x] >= x
        
        // Check: NOT more than x numbers >= x
        //   → look at the (x+1)-th largest value (index n-x-1)
        // If index doesn't exist, that's fine.
        const onlyX = (n - x - 1 < 0 || nums[n - x - 1] < x)

        if (atLeastX && onlyX) return x
    }

    return -1
};




/*

Better

O(nlogn) & O(1)

*/

var specialArray = function(nums) {
    nums.sort((a, b) => b - a)   // Sort descending
    const n = nums.length
   
    for (let x = 1; x <= n; x++) {

        // nums[x - 1] is the x-th largest number
        // Check: at least x numbers >= x
        const atLeastX = nums[x - 1] >= x

        // Check: NOT more than x numbers >= x
        // If x == n, no next element exists → OK
        const onlyX = (x === n || nums[x] < x)

        if (atLeastX && onlyX) return x
    }

    return -1
};



/*

Optimal

O(n) & O(n)

*/

var specialArray = function(nums) {
    const n = nums.length
    
    // freq[i] = number of elements equal to i
    // freq[n] = number of elements >= n
    const freq = new Array(n + 1).fill(0)

    for (let num of nums) {
        freq[Math.min(num, n)]++   // Clamp values > n into freq[n]
    }
    
    let count = 0   // running count of numbers >= x

    // Sweep backwards because we need suffix sums:
    // count(>=x) = freq[x] + freq[x+1] + ... + freq[n]
    for (let x = n; x >= 1; x--) {
        count += freq[x]       // Add bucket x into suffix sum

        // If exactly x numbers are >= x → found special value
        if (count === x) return x
    }

    return -1
};
