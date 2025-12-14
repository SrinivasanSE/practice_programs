// https://www.geeksforgeeks.org/dsa/find-zeroes-to-be-flipped-so-that-number-of-consecutive-1s-is-maximized/

// Here k is not given and we take it as 1 and in 1004 problem, k is given
/*

Brute

O(n^2) & O(1)

*/

class Solution {
    maxOnes(arr) {
        // code here
        let cnt = 0
        const n = arr.length
        let max = 0, k = 1
        
        for (let i = 0; i < n; i++) {
            cnt = 0
            for (let j = i; j < n; j++) {
                if (arr[j] === 0) {
                    cnt++
                }
                
                if (cnt <= k) {
                    max = Math.max(max, j - i + 1)
                }
            }
        }
        
        return max
    }
}


/*

Better
O(2n) & O(1)

*/

var longestOnes = function(nums) {
    let len = 0, k = 1
    const n = nums.length
    let count = 0
    let start = 0
    for (let right = 0; right < n; right++) {
        if (nums[right] === 0) {
            count++
        }

        while (count > k) {
            if (nums[start] === 0) count--
            start++
        }

        len = Math.max(len, right - start + 1)
    }

    return len
};

/*

Optimal
O(n) & O(1)

*/

var longestOnes = function(nums) {
   
    const n = nums.length
    let start = 0, right, k = 1
    for (right = 0; right < n; right++) {
        if (nums[right] === 0) {
            k--
        }

        if (k < 0) { //if there are more zeros, remove the zero and move the start
            if (nums[start] === 0) { // if the start is not zero, the k will remain invalid and we keep moving the start till we find the zero and make k valid
                k+=1
            }
            start++ 
        }
    }

    return right - start // now right will be equal to n, so we don't need to add +1 to the result
};