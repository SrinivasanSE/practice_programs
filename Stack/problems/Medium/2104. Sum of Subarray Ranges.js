// https://leetcode.com/problems/sum-of-subarray-ranges/description/

/*

Combination of 907 leetcode problem

// O(n) & O(n)


*/

const findNGE = (nums, n) => {
  const res = [],
    stk = [];

  for (let i = n - 1; i >= 0; i--) {
    while (stk.length > 0 && nums[stk[stk.length - 1]] <= nums[i]) {
      stk.pop();
    }

    res[i] = stk.length ? stk[stk.length - 1] : n;
    stk.push(i);
  }

  return res;
};

const findPGE = (nums, n) => {
  const res = [],
    stk = [];

  for (let i = 0; i < n; i++) {
    while (stk.length > 0 && nums[stk[stk.length - 1]] < nums[i]) {
      stk.pop();
    }

    res[i] = stk.length ? stk[stk.length - 1] : -1;
    stk.push(i);
  }

  return res;
};

const subArrMax = (nums) => {
  const n = nums.length;
  let nge = findNGE(nums, n);
  let pge = findPGE(nums, n);

  let total = 0,
    left,
    right;

  for (let i = 0; i < n; i++) {
    left = i - pge[i];
    right = nge[i] - i;

    total += right * left * nums[i];
  }

  return total;
};

const findNSE = (nums, n) => {
  const res = [],
    stk = [];

  for (let i = n - 1; i >= 0; i--) {
    while (stk.length > 0 && nums[stk[stk.length - 1]] >= nums[i]) {
      stk.pop();
    }

    res[i] = stk.length ? stk[stk.length - 1] : n;
    stk.push(i);
  }

  return res;
};

const findPSE = (nums, n) => {
  const res = [],
    stk = [];

  for (let i = 0; i < n; i++) {
    while (stk.length > 0 && nums[stk[stk.length - 1]] > nums[i]) {
      stk.pop();
    }

    res[i] = stk.length ? stk[stk.length - 1] : -1;
    stk.push(i);
  }

  return res;
};

const subArrMin = (nums) => {
  const n = nums.length;
  let nse = findNSE(nums, n);
  let pse = findPSE(nums, n);

  let total = 0,
    left,
    right;

  for (let i = 0; i < n; i++) {
    left = i - pse[i];
    right = nse[i] - i;

    total += right * left * nums[i];
  }

  return total;
};

var subArrayRanges = function (nums) {
  return subArrMax(nums) - subArrMin(nums);
};

/*

Optimised

O(n) & O(n)

*/

const sumMin = (arr) => {
  let pse,
    nse,
    left,
    right,
    sum = 0,
    stk = [],
    curr;
  const n = arr.length;
  for (let i = 0; i <= n; i++) {
    while (stk.length > 0 && (i === n || arr[stk[stk.length - 1]] > arr[i])) {
      curr = stk.pop();
      pse = stk.length === 0 ? -1 : stk[stk.length - 1];
      nse = i;
      left = curr - pse;
      right = nse - curr;
      sum += left * right * arr[curr];
    }
    stk.push(i);
  }

  return sum;
};

const sumMax = (arr) => {
  let pge,
    nge,
    left,
    right,
    sum = 0,
    stk = [],
    curr;
  const n = arr.length;
  for (let i = 0; i <= n; i++) {
    while (stk.length > 0 && (i === n || arr[stk[stk.length - 1]] < arr[i])) {
      curr = stk.pop();
      pge = stk.length === 0 ? -1 : stk[stk.length - 1];
      nge = i;
      left = curr - pge;
      right = nge - curr;
      sum += left * right * arr[curr];
    }
    stk.push(i);
  }

  return sum;
};

var subArrayRanges = function (nums) {
  return sumMax(nums) - sumMin(nums);
};

// Using sumMax itself by converting nums to negative

var subArrayRanges = function (nums) {
  const n = nums.length;

  return (
    sumMax(nums, n) +
    sumMax(
      nums.map((num) => -num),
      n,
    )
  );
};
