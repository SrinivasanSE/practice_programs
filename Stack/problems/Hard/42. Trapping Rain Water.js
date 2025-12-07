// https://leetcode.com/problems/trapping-rain-water/description/

// This is not a stack related program

/*

Brute
O(n) & O(2n)

*/

var trap = function (height) {
  let capacity = 0;
  const n = height.length;
  let prefixMax = new Array(n); // we can remove the prefix array and calculate the prefixMax while traversing as well
  let suffixMax = new Array(n);
  prefixMax[0] = height[0];
  suffixMax[n - 1] = height[n - 1];
  for (let i = 1; i < n; i++) {
    prefixMax[i] = Math.max(prefixMax[i - 1], height[i]);
    suffixMax[n - i - 1] = Math.max(suffixMax[n - i], height[n - i - 1]);
  }
  let leftMax, rightMax;
  for (let i = 0; i < n; i++) {
    // we calc the capacity for each
    (leftMax = prefixMax[i]), (rightMax = suffixMax[i]);
    if (height[i] < leftMax && height[i] < rightMax) {
      // left and right should be greater
      capacity += Math.min(leftMax, rightMax) - height[i]; // decrease the height since water can't be trapped in that height
    }
  }

  return capacity;
};

/*

Optimal - Two Pointers

O(n) & O(1)

*/

var trap = function (height) {
  const n = height.length;

  // Two pointers at the ends of the array
  let l = 0,
    r = n - 1;

  // lMax = maximum height seen so far from the LEFT
  // rMax = maximum height seen so far from the RIGHT
  let lMax = 0,
    rMax = 0;

  // Total trapped water
  let total = 0;

  // Process until the two pointers meet
  while (l < r) {
    // Always move the pointer with the LOWER height
    // because the smaller side determines the water level
    if (height[l] <= height[r]) {
      // if the right side is greater, that means that can definitely help to trap the water, but it's determined by the min(left, right), so for the current item, it's determined by the leftMax

      // If left max is taller than current left height,
      // water can be trapped at index l.
      // The amount is (lMax - height[l])
      if (lMax > height[l]) {
        total += lMax - height[l];
      }
      // Otherwise, update the new maximum from the left side
      else {
        lMax = height[l];
      }

      // Move left pointer inward
      l++;
    } else {
      // height[l] > height[r]

      // Same logic for the right side:
      // If rMax is taller than current right height,
      // water can be trapped at index r
      if (rMax > height[r]) {
        total += rMax - height[r];
      }
      // Otherwise update right max
      else {
        rMax = height[r];
      }

      // Move right pointer inward
      r--;
    }
  }

  return total;
};

var trap = function (height) {
  let left = 0; // left pointer starts at the leftmost bar
  let right = height.length - 1; // right pointer starts at the rightmost bar

  let leftMax = height[left]; // leftMax and rightMax start as the boundary bars
  let rightMax = height[right]; // edges cannot trap water, so we initialize with edge heights

  let water = 0; // total trapped water

  while (left < right) {
    // process until pointers meet
    // Decide which pointer to move:
    // The side with the smaller max height is the limiting side.
    // Water trapped on the "smaller max" side depends only on that side.
    if (leftMax < rightMax) {
      left++; // Move left pointer inward
      // (we increment first because index 0 is already accounted in leftMax)

      leftMax = Math.max(leftMax, height[left]);
      // Update leftMax with the new bar

      water += leftMax - height[left];
      // If leftMax > current height, we trap water
      // Otherwise, this contributes 0
    } else {
      right--; // Move right pointer inward
      // (index rightMax was already processed initially)

      rightMax = Math.max(rightMax, height[right]);
      // Update rightMax with the new bar

      water += rightMax - height[right];
      // Trap water on the right side
    }
  }

  return water;
};
