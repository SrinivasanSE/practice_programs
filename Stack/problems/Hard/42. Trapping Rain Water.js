// https://leetcode.com/problems/trapping-rain-water/description/

/*

Brute
O(n) & O(2n)

*/



var trap = function (height) {
    let capacity = 0
    const n = height.length
    let prefixMax = new Array(n) // we can remove the prefix array and calculate the prefixMax while traversing as well
    let suffixMax = new Array(n)
    prefixMax[0] = height[0]
    suffixMax[n - 1] = height[n - 1]
    for (let i = 1; i < n; i++) {
        prefixMax[i] = Math.max(prefixMax[i - 1], height[i])
        suffixMax[n - i - 1] = Math.max(suffixMax[n - i], height[n - i - 1])
    }
    let leftMax, rightMax
    for (let i = 0; i < n; i++) {
        leftMax = prefixMax[i], rightMax = suffixMax[i]
        if (height[i] < leftMax && height[i] < rightMax) {
            capacity += (Math.min(leftMax, rightMax) - height[i])
        }
    }

    return capacity
};


/*

Optimal - Understand this sol more

O(n) & O(1)

*/

var trap = function(height) {
    const n = height.length
    
    // Two pointers at the ends of the array
    let l = 0, r = n - 1
    
    // lMax = maximum height seen so far from the LEFT
    // rMax = maximum height seen so far from the RIGHT
    let lMax = 0, rMax = 0
    
    // Total trapped water
    let total = 0

    // Process until the two pointers meet
    while (l < r) {

        // Always move the pointer with the LOWER height
        // because the smaller side determines the water level
        if (height[l] <= height[r]) { // if the right side is greater, that means that can definitely help to trap the water, but it's determined by the min(left, right), so for the current item, it's determined by the leftMax

            // If left max is taller than current left height,
            // water can be trapped at index l.
            // The amount is (lMax - height[l])
            if (lMax > height[l]) {
                total += (lMax - height[l])
            } 
            // Otherwise, update the new maximum from the left side
            else {
                lMax = height[l]
            }

            // Move left pointer inward
            l++
        } 
        
        else { // height[l] > height[r]
            
            // Same logic for the right side:
            // If rMax is taller than current right height,
            // water can be trapped at index r
            if (rMax > height[r]) {
                total += (rMax - height[r])
            } 
            // Otherwise update right max
            else {
                rMax = height[r]
            }

            // Move right pointer inward
            r--
        }
    }

    return total
};
