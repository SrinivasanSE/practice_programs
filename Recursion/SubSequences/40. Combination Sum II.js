// https://leetcode.com/problems/combination-sum-ii/description/

/*

Recursion

O(2^n * n) & O(2^n * n)

*/


// At any recursion level, the algorithm ensures that a number is either picked once, or all of its duplicates are skipped together.

var combinationSum2 = function (candidates, target) {
  const n = candidates.length;
  const res = [];
  candidates.sort((a, b) => a - b); // we sort so that we can skip the duplicates

  const findCombination = (index, sum, subsets) => {
    if (sum === target) {
      res.push([...subsets]);
      return;
    }

    if (sum > target || index === n) return;

    subsets.push(candidates[index]);
    findCombination(index + 1, sum + candidates[index], subsets);
    subsets.pop();

    while (index + 1 < n && candidates[index] === candidates[index + 1]) {
      // once we take the elements already in the above recursion, we can skip here
      index++;
    }

    findCombination(index + 1, sum, subsets);
  };

  findCombination(0, 0, []);
  return res;
};

var combinationSum2 = function (candidates, target) {
  const res = [];

  candidates.sort((a, b) => a - b);

  const n = candidates.length;

  const generate = (i, sum, arr) => {
    if (sum === target) {
      res.push([...arr]);
      return;
    }

    if (sum > target || i === n) return;

    for (let index = i; index < n; index++) {
      if (index > i && candidates[index] === candidates[index - 1]) continue;

      if (sum + candidates[index] > target) break;
      arr.push(candidates[index]);
      generate(index + 1, sum + candidates[index], arr);
      arr.pop();
    }
  };

  generate(0, 0, []);
  return res;
};
