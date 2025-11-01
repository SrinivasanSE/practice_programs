// https://leetcode.com/problems/find-the-duplicate-number/description/

/*

Brute

O(nlogn) & O(1)

*/


var findDuplicate = function(nums) { // array is modified
    nums.sort((a, b) => a - b)
    const n = nums.length
    
    for (let i = 1; i <= n; i++) {
        if (nums[i - 1] === nums[i]) return nums[i]
    }
};

/*

Better

O(n) & O(n)

*/

var findDuplicate = function(nums) { // extra space used
    const set = new Set()

    for (let num of nums) {
        if (set.has(num)) return num
        set.add(num)
    }
};


/*

Optimal

O(n) & O(1)

*/


var findDuplicate = function(nums) { // array is modified
    const n = nums.length
    let curr
    for (let i = 0; i < n; i++) {
        curr = Math.abs(nums[i])
        if (nums[curr] > 0) { // if it's not already negative
            nums[curr] *= -1
        } else {
            return curr
        }
    }
};


/*

Optimal - Floyd cycle detection algo

O(n) & O(1)

*/


var findDuplicate = function (nums) {

    // Step 1️⃣: Initialize two pointers
    // Both start from the first element (value at index 0)
    // Think of nums[i] as a "pointer" to the next index
    let slow = nums[0]
    let fast = nums[0]

    // Step 2️⃣: Phase 1 — Find intersection point inside the cycle
    // Move `slow` by 1 step, and `fast` by 2 steps each time
    // Because there is a duplicate, a cycle must exist
    while (true) {
        slow = nums[slow]           // move one step
        fast = nums[nums[fast]]     // move two steps

        // When they meet, it means we are inside the cycle
        if (slow === fast) break
    }

    // Step 3️⃣: Phase 2 — Find the start of the cycle (duplicate number)
    // Reset one pointer (`slow2`) back to the start of the array
    // Keep the other pointer (`slow`) at the meeting point
    let slow2 = nums[0]

    // Move both one step at a time
    // The point where they meet again is the start of the cycle
    // That value is the duplicate number
    while (slow != slow2) {
        slow = nums[slow]
        slow2 = nums[slow2]
    }

    // Step 4️⃣: Return the duplicate number (start of cycle)
    return slow
};

