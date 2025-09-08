// https://leetcode.com/problems/combination-sum-ii/description/

var combinationSum2 = function (candidates, target) {
    const n = candidates.length
    const res = []
    candidates.sort((a, b) => a - b) // we sort so that we can skip the duplicates

    const findCombination = (index, sum, subsets) => {
        if (sum === target) {
            res.push([...subsets])
            return
        }

        if (sum > target || index === n) return


        subsets.push(candidates[index])
        findCombination(index + 1, sum + candidates[index], subsets)
        subsets.pop()

        while (index + 1 < n && candidates[index] === candidates[index + 1]) { // once we take the elements already in the above recursion, we can skip here
            index++
        }

        findCombination(index + 1, sum, subsets)
    }

    findCombination(0, 0, [])
    return res
};