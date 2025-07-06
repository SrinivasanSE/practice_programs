// https://leetcode.com/problems/longest-consecutive-sequence/description/


/*
Brute Force - Linear search
O(N^2) & O(1)
*/




function linearSearch(arr, num) {
    let n = arr.length; // size of array
    for (let i = 0; i < n; i++) {
        if (arr[i] === num)
            return true;
    }
    return false;
}

function longestSuccessiveElements(arr) {
    let n = arr.length; // size of array
    let longest = 1;
    // pick an element and search for its
    // consecutive numbers:
    for (let i = 0; i < n; i++) {
        let x = arr[i];
        let cnt = 1;
        // search for consecutive numbers
        // using linear search:
        while (linearSearch(arr, x + 1) === true) {
            x += 1;
            cnt += 1;
        }

        longest = Math.max(longest, cnt);
    }
    return longest;
}

let arr = [100, 200, 1, 2, 3, 4];


/*
Better - Sorting

O(nlogn) & O(1)

*/


var longestConsecutive = function(nums) {
    const n = nums.length
    let min = Number.MIN_SAFE_INTEGER
    if (n === 0) return 0
    nums.sort((a, b) => a - b)
    let longest = 1, currCount = 0
    for(let i = 0; i < n; i++ ) {
        if (nums[i] - min === 1) {
                currCount++
                
        
        } else if (nums[i] !== min) {
            currCount = 1
            
        }
        min = nums[i]
        longest = Math.max(currCount, longest)
    }

    return longest
};


/*

Optimal - Use set

O(N) & O(1)

*/


var longestConsecutive = function(nums) {
    const n = nums.length
    let min = Number.MIN_SAFE_INTEGER
    if (n === 0) return 0
    let count = 0, longest = 1
    const set = new Set()
    for(let i = 0; i < n; i++ ) {
        set.add(nums[i])
    }
    for(let num of set) {
        if (!set.has(num - 1)) {
            let x = num
            count = 1

            while (set.has(x + 1)) {
                x++
                count++
            }

            longest = Math.max(longest, count)
        }
    }
    return longest
};