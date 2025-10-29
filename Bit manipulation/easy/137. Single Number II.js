// https://leetcode.com/problems/single-number-ii/description/

/*

Brute

O(nlogn) & O(1)

*/

var singleNumber = function (nums) {
    const n = nums.length
    nums.sort((a, b) => a - b)

    for (let i = 1; i < n; i += 3) { // increment by 3 and check in groups of 3
        if (nums[i] != nums[i - 1]) {
            return nums[i - 1]
        }
    }

    return nums[n - 1] // it will be the last number if it's not found

};

/*

Brute

O(n * 32) & O(1)

*/


var singleNumber = function (nums) {
    const n = nums.length

    let count = 0, ans = 0
    for (let i = 0; i < 32; i++) { // iterate through all the 32 bits
        count = 0
        for (let j = 0; j < n; j++) {
            if (nums[j] & (1 << i)) { // count the number of set bits
                count++
            }
        }

        if (count % 3) { // if the set bits are not a multiple of 3, that means, the extra bit is coming from the single number, set the bit in the bitIndex
            ans = ans | (1 << i)
        }
    }

    return ans | 0 // this is for converting to signed integer
};

/*

Better

O(n) & O(n)

*/


var singleNumber = function (nums) {
    const map = new Map()

    for (let num of nums) {
        map.set(num, (map.get(num) || 0) + 1)
    }

    for (let [key, value] of map) {
        if (value === 1) return key
    }
};


/*

Optimal

O(n) & O(1)

*/


var singleNumber = function (nums) {
    let ones = 0, twos = 0

    for (let num of nums) {
        ones = (ones ^ num) & ~twos // if it's not present in twos, add to ones
        twos = (twos ^ num) & ~ones // if it's not present in ones, add to tows. If it's present in both ones and twos, it will be removed in both
    }

    return ones

};