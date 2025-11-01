// https://leetcode.com/problems/single-number/description/

/*

Brute Force

O(n^2) & O(1)

*/


function getSingleElement(arr) {
  // Size of the array:
  const n = arr.length;

  // Run a loop for selecting elements:
  for (let i = 0; i < n; i++) {
    const num = arr[i]; // selected element
    let cnt = 0;

    // Find the occurrence using linear search:
    for (let j = 0; j < n; j++) {
      if (arr[j] === num) {
        cnt++;
      }
    }

    // If the occurrence is 1, return the number:
    if (cnt === 1) {
      return num;
    }
  }

  // This line will never execute
  // if the array contains a single element.
  return -1;
}



/*

Better 1
O(n) & O(n)

*/

var singleNumber = function (nums) {
  const map = new Map()
  const n = nums.length

  for (let i = 0; i < n; i++) {
    map.set(nums[i], (map.get(nums[i]) || 0) + 1)
  }

  for (let [num, count] of map) {
    if (count === 1) {
      return num
    }
  }
};

/*

Better - 2

O(nlogn) & O(1)


*/

var singleNumber = function (nums) {
  if (nums.length == 1) return nums[0]
  nums = nums.sort()
  for (let i = 0; i < nums.length; i += 2) { // incremented by 2
    if (nums[i] != nums[i + 1]) {
      return nums[i]
    }

  }

  return nums[nums.length - 1]
};

/*

Optimal
O(n) & O(1)

*/

var singleNumber = function (nums) {
  const n = nums.length

  let xor = 0
  for (let i = 0; i < n; i++) {
    xor ^= nums[i]
  }

  return xor
};