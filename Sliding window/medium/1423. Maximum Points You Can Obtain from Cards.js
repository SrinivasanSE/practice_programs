// https://leetcode.com/problems/maximum-points-you-can-obtain-from-cards/description/

/*

O(2k) & O(1)

*/


var maxScore = function(cardPoints, k) {
    const n = cardPoints.length
    let lSum = 0, rSum = 0, maxSum = 0, rIndex = n - 1
    
    for (let i = 0; i < k; i++) {
        lSum += cardPoints[i]
    }
    maxSum = lSum

    for (let i = k - 1; i >= 0; i--) {
        lSum -= cardPoints[i] // keep removing from the left
        rSum += cardPoints[rIndex] // keep adding from the end
        rIndex--
        maxSum = Math.max(maxSum, lSum + rSum) // find which is the max sum
    }

    return maxSum
};