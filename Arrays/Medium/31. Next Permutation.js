// https://leetcode.com/problems/next-permutation/description/


/*
Brute

 - Generate all possible subarrays - refer permutations approach
 - Do linear search and find the current given array position
 - Return the next index arr

*/

/*
Optimal
O(N) & O(1)

1) Find the breakpoint where the next element is greater than the current element, if there is no breakpoint, that means that's the last permutation and next one would be the start
so, we reverse the whole array.

2) We iterate from the end and find the smallest possible greater number than the current idx value and swap and break

3) Now, the part from idx to n-1 will be in the sorted position only, so we just reverse it to get the next permutation.
*/


var nextPermutation = function(nums) {
    const n = nums.length
    let idx = -1
    for(let i = n - 2; i >= 0; i--) { // [1, 2, 3]
        if (nums[i] < nums[i + 1]) { // 2 < 3
            idx = i
            break
        }
    }
    if (idx === -1) { // [3, 2, 1]
        reverse(nums, 0, n - 1)
        return
    }

    for(let i = n - 1; i > idx; i--) {
        if (nums[idx] < nums[i]) {
            [nums[idx], nums[i]] = [nums[i], nums[idx]] // [1, 3, 2]
            break
        }
    }

    reverse(nums, idx + 1, n - 1)   // after idx + 1, just reverse the elements a
};

const reverse = (arr, start, end) => {
    while (start < end) {
        [arr[start], arr[end]] = [arr[end], arr[start]]
        start++
        end--
    }
}