// https://leetcode.com/problems/combination-sum/description/

/*

Recursive - Backtracking

Time Complexity: O(K * 2k), where K is average size of a valid combination and k = Target​ / min(arr), depth of the recursion tree.
Auxiliary Space: O(k), considering the recursive stack and neglecting the space required to store the combinations.

*/

var combinationSum = function (candidates, target) {
  const res = [];
  const subset = [];
  const n = candidates.length;
  const findCombination = (index, sum, subset) => {
    if (sum > target) {
      return;
    }
    if (index >= n) {
      if (sum === target) {
        res.push([...subset]);
      }

      return;
    }

    subset.push(candidates[index]);
    findCombination(index, sum + candidates[index], subset); // same as find all subsequences, instead of index + 1, we use index, since we can use the same num many times
    subset.pop();
    findCombination(index + 1, sum, subset);
  };
  findCombination(0, 0, subset);
  return res;
};

// Another approach of using loops

var combinationSum = function (candidates, target) {
  const n = candidates.length;
  let res = [];

  const generate = (i, sum, arr) => {
    if (sum > target) return;

    if (sum == target) {
      res.push([...arr]);
      return;
    }

    for (let j = i; j < n; j++) {
      arr.push(candidates[j]);
      generate(j, sum + candidates[j], arr);
      arr.pop();
    }
  };

  generate(0, 0, []);
  return res;
};
