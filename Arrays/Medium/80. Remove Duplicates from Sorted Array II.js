// https://leetcode.com/problems/remove-duplicates-from-sorted-array-ii/description/

/*

Brute

O(n) & O(n)

*/


var removeDuplicates = function (nums) {
    const n = nums.length

    if (n <= 2) return n

    const map = new Map()
    let k = 0
    for (let i = 0; i < nums.length; i++) {
        map.set(nums[i], (map.get(nums[i]) || 0) + 1)
        if (map.get(nums[i]) < 3) {
            nums[k++] = nums[i]
        }
    }

    return k
};


/*

Optimal

O(n) & O(1)

*/


var removeDuplicates = function (nums) {
    const n = nums.length

    // If the array has 2 or fewer elements, it's already valid (no more than 2 duplicates possible)
    if (n <= 2) return n

    // `k` is the position to place the next valid element
    // Start from index 2, since the first two elements are always allowed
    let k = 2

    // Iterate through the array starting from index 2
    for (let i = 2; i < nums.length; i++) {
        // Compare current element with the element at position (k - 2)
        // If they are different, it means we have not yet exceeded the allowed count (2)
        if (nums[i] != nums[k - 2]) {
            // Place nums[i] at index `k`, since it's valid
            nums[k++] = nums[i]
        }
        // If nums[i] == nums[k - 2], it means we already have two of this number,
        // so we skip adding it (thus removing extra duplicates)
    }

    // Return the new length of the valid portion of the array
    return k
};

/*
Example walkthrough:
Input: [1, 1, 1, 2, 2, 3]
Steps:
- Start with k = 2
- i = 2 → nums[i]=1, nums[k-2]=1 → same → skip
- i = 3 → nums[i]=2, nums[k-2]=1 → different → nums[k]=2, k=3
- i = 4 → nums[i]=2, nums[k-2]=1 → different → nums[k]=2, k=4
- i = 5 → nums[i]=3, nums[k-2]=2 → different → nums[k]=3, k=5
Output: [1, 1, 2, 2, 3] and return 5
*/
