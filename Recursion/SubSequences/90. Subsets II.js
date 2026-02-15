// https://leetcode.com/problems/subsets-ii/description/

/*

O(2^n) * O(n) & (2^n) * O(k) or O(n)

where k is the average size of a subset

*/

var subsetsWithDup = function (nums) {
  const n = nums.length;
  const res = [];
  nums.sort((a, b) => a - b);

  const findSubsets = (index, curr) => {
    if (index === n) {
      res.push([...curr]);
      return;
    }

    curr.push(nums[index]);
    findSubsets(index + 1, curr);
    curr.pop();

    while (index + 1 < n && nums[index] === nums[index + 1]) {
      index++;
    }
    findSubsets(index + 1, curr);
  };

  findSubsets(0, []);
  return res;
};

var subsetsWithDup = function (nums) {
  const n = nums.length;
  const res = [];
  nums.sort((a, b) => a - b);

  const findSubsets = (index, curr) => {
    res.push([...curr]);
    for (let i = index; i < n; i++) {
      if (i > index && nums[i] === nums[i - 1]) continue;

      curr.push(nums[i]);
      findSubsets(i + 1, curr);
      curr.pop();
    }
  };

  findSubsets(0, []);
  return res;
};
