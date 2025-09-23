// https://leetcode.com/problems/sum-of-subarray-ranges/description/

// Optimise the sol

/*

Combination of 907 leetcode problem

// O(n) & O(n)


*/


const findNGE = (nums, n) => {
    const res = [], stk = []

    for (let i = n - 1; i >= 0; i--) {
        while (stk.length > 0 && nums[stk[stk.length - 1]] <= nums[i]) {
            stk.pop()
        }

        res[i] = stk.length ? stk[stk.length - 1] : n
        stk.push(i)
    }

    return res
}

const findPGE = (nums, n) => {
    const res = [], stk = []

    for (let i = 0; i < n; i++) {
        while (stk.length > 0 && nums[stk[stk.length - 1]] < nums[i]) {
            stk.pop()
        }

        res[i] = stk.length ? stk[stk.length - 1] : -1
        stk.push(i)
    }

    return res
}

const subArrMax = (nums) => {
    const n = nums.length
    let nge = findNGE(nums, n)
    let pge = findPGE(nums, n)

    let total = 0, left, right

    for (let i = 0; i < n; i++) {
        left = i - pge[i]
        right = nge[i] - i

        total += (right*left*nums[i])
    }

    return total
}


const findNSE = (nums, n) => {
    const res = [], stk = []

    for (let i = n - 1; i >= 0; i--) {
        while (stk.length > 0 && nums[stk[stk.length - 1]] >= nums[i]) {
            stk.pop()
        }

        res[i] = stk.length ? stk[stk.length - 1] : n
        stk.push(i)
    }

    return res
}

const findPSE = (nums, n) => {
    const res = [], stk = []

    for (let i = 0; i < n; i++) {
        while (stk.length > 0 && nums[stk[stk.length - 1]] > nums[i]) {
            stk.pop()
        }

        res[i] = stk.length ? stk[stk.length - 1] : -1
        stk.push(i)
    }

    return res
}

const subArrMin = (nums) => {
    const n = nums.length
    let nse = findNSE(nums, n)
    let pse = findPSE(nums, n)

    let total = 0, left, right

    for (let i = 0; i < n; i++) {
        left = i - pse[i]
        right = nse[i] - i

        total += (right*left*nums[i])
    }

    return total
}

var subArrayRanges = function(nums) {
    return subArrMax(nums) - subArrMin(nums)
};