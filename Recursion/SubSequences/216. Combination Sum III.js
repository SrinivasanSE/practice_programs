// https://leetcode.com/problems/combination-sum-iii/description/


/*
O(C(9,k)) Since we explore combinations of k elements from 9 total numbers.
O(2^9) & O(k)

*/

var combinationSum3 = function(k, target) {
    const res = []

    const findCombinations = (num, subset, count, sum) => {
        if (sum > target) {
            return 
        }

        if (count === k) {
            if (sum === target) {
                res.push([...subset])
            }

            return
        }

        if (num > 9) {
            return
        }

        subset.push(num)
        findCombinations(num + 1, subset, count + 1, sum + num)
        subset.pop(num)
        findCombinations(num + 1, subset, count, sum)
    }

    findCombinations(1, [], 0, 0)
    return res
};

