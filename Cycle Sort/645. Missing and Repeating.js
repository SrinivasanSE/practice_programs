//https://www.geeksforgeeks.org/find-a-repeating-and-a-missing-number/
// https://leetcode.com/problems/set-mismatch/


/*

Brute - Two loops

*/


/*

Better - Hashmap

O(n) & O(n)

*/

class Solution {
    // Function to find two repeating elements in an array of size n.
    findTwoElement(arr) {
        let res1,res2
        let n = arr.length
        let hashmap = new Array(n + 1).fill(0)
        for(let i = 0; i < n; i++) {
            hashmap[arr[i]]++
            if(hashmap[arr[i]] > 1) {
                res2 = arr[i]
            }
        }
        for(let i = 1; i <=n; i++) {
            if(hashmap[i] === 0) {
                res1 = i
                break
            }     
        }
        
        return [res2, res1]
    }
}

/*

Optimal - Using array index negative
O(n) & O(1)

*/

class Solution {
    // Function to find two repeating elements in an array of size n.
    findTwoElement(arr) {
        let repeating
        let n = arr.length
        let sum = n*(n + 1)/2
        for(let i = 0; i < n; i++) {
            const index = Math.abs(arr[i])
            if (arr[index - 1] > 0) { // should be index - 1
                arr[index - 1] *= -1 // make the value at the index negative, so if we find the same num again, it will be already negative and go to else block
                sum -= index
            } else {
                repeating = index // should take the index
            }
        }
        
        return [repeating, sum]
    }
}

/*

Optimal - Cycle sort

O(n) & O(1)

*/


var findErrorNums = function(nums) {
    const n = nums.length

    let missing, repeating, i = 0, crtIdx

    while (i < n) {
        crtIdx = nums[i] - 1
        if (nums[i] != nums[crtIdx]) {
            [nums[i], nums[crtIdx]] = [nums[crtIdx], nums[i]]
        } else {
            i++
        }
    }

    for (let i = 0; i < n; i++) {
        if (nums[i] != i + 1) {
            missing = i + 1
            repeating = nums[i]
            break
        }
    }

    return [repeating, missing]

};



/*

Optimal - Maths
O(n) & O(1)

*/

function findMissingRepeatingNumbers(a) {
    const n = a.length; // Size of the array (numbers should ideally be 1 to n)

    // ------------------------------------------------------------
    // Step 1: Calculate the expected sum (Sn) and sum of squares (S2n)
    // for numbers from 1 to n.
    //
    // Sum of first n natural numbers: n*(n+1)/2
    // Sum of squares of first n natural numbers: n*(n+1)*(2n+1)/6
    // ------------------------------------------------------------
    const SN = (n * (n + 1)) / 2;  
    const S2N = (n * (n + 1) * (2 * n + 1)) / 6;

    // ------------------------------------------------------------
    // Step 2: Calculate the actual sum (S) and sum of squares (S2)
    // from the given array `a`.
    //
    // S = sum of all elements in array (including duplicate)
    // S2 = sum of squares of all elements
    // ------------------------------------------------------------
    let S = 0, S2 = 0;
    for (let i = 0; i < n; i++) {
        S += a[i];
        S2 += a[i] * a[i];
    }

    // ------------------------------------------------------------
    // Step 3: Derive two equations:
    //
    // Let X = repeating number, Y = missing number
    //
    // Equation 1: (S - Sn) = X - Y   → difference of sums
    // Equation 2: (S2 - S2n) = X² - Y² = (X - Y)(X + Y)
    //
    // From Eq.2, we can derive: X + Y = (S2 - S2n) / (S - Sn)
    // ------------------------------------------------------------
    const val1 = S - SN; // (X - Y)
    let val2 = S2 - S2N; // (X² - Y²)

    // Calculate (X + Y)
    val2 = val2 / val1;

    // ------------------------------------------------------------
    // Step 4: Solve the two equations:
    //
    // X - Y = val1
    // X + Y = val2
    //
    // Add both → 2X = val1 + val2  → X = (val1 + val2) / 2
    // Subtract → Y = X - val1
    // ------------------------------------------------------------
    const x = (val1 + val2) / 2;  // Repeating number (X)
    const y = x - val1;           // Missing number (Y)

    // ------------------------------------------------------------
    // Step 5: Return the results.
    // The order [x, y] means [repeating, missing].
    // ------------------------------------------------------------
    return [x, y];
}
