// https://leetcode.com/problems/maximum-points-you-can-obtain-from-cards/description/

/*

O(2k) & O(1)

*/

/*

We need to get max points, so we first add k cardPoints from the left and then try to reduce the sum from the left and add from the right and see taking which cards gives the max points.

*/

var maxScore = function (cardPoints, k) {
  const n = cardPoints.length;
  let lSum = 0,
    rSum = 0,
    maxSum = 0,
    rIndex = n - 1;

  for (let i = 0; i < k; i++) {
    lSum += cardPoints[i];
  }

  if (k === n) return lSum; // if k === n, we can take all the cards
  maxSum = lSum;

  for (let i = k - 1; i >= 0; i--) {
    lSum -= cardPoints[i]; // keep removing from the left
    rSum += cardPoints[rIndex]; // keep adding from the end
    rIndex--;
    maxSum = Math.max(maxSum, lSum + rSum); // find which is the max sum
  }

  return maxSum;
};
