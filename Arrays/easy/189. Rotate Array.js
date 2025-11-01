// https://leetcode.com/problems/rotate-array/description/
// https://www.geeksforgeeks.org/dsa/array-rotation/

// Left rotate by K places

// Brute
// O(n*d) & O(1)


class Solution {
    // Function to rotate an array by d elements in counter-clockwise direction.
    rotateArr(arr, d) {
        // code here
        const n = arr.length
        d = d % n
        
        for(let i = 0; i < d; i++) {
            let first = arr[0] // Rotate one by one
            for(let j = 1; j < n; j++) {
                arr[j - 1] = arr[j]
            }
            arr[n - 1] = first
        }
    }
}

// Better
// O(n + d) & O(k)
class Solution {
    rotateArray(nums, k) {
        const n = nums.length
        k = k % n
        let temp = new Array(k)
        for(let i = 0; i < k; i++) { // move the first k elements to a temp array
            temp[i] = nums[i]
        }

        for(let i = k; i < n; i++) { // move elements from k to n to front
            nums[i - k] = nums[i]
        }

        for(let i = n - k; i < n; i++) { // place the elements from the temp to the last
            nums[i] = temp[i - (n - k)]
        }
    }
}

// Optimal
// O(n) & O(1)

class Solution {
    // Function to rotate an array by d elements in counter-clockwise direction.
    rotateArr(arr, d) {
        // code here
        const n = arr.length
        d = d % n
        
        this.reverse(arr, 0, d - 1) // rotate first d 
        this.reverse(arr, d, n - 1) // rotate from d to n
        this.reverse(arr, 0, n - 1) // rotate the whole array
        
    }
    
    
    reverse(arr, s, e) {
        
        while (s < e) {
            [arr[s], arr[e]] = [arr[e], arr[s]]
            s++
            e--
        }
    }
}


/***************************************************************** Right rotate ************************************************************** */

// Brute force
// O(n*d) & O(1)

var rotate = function(nums, k) {
    const n = nums.length

    for(let i = 0; i < k; i++) {
        let last = nums[n - 1]
        for(let j = n - 2; j >= 0; j--) { // should traverse from back, if we go from front, we will overwrite the value again and again
            nums[j + 1] = nums[j]
        }
        nums[0] = last
    }
};


// Better
// O(n) & O(n)

var rotate = function(nums, k) {
    const n = nums.length
    k = k % n
    
    const rotated = new Array(n)

    for(let i = 0; i < n; i++) {
        rotated[(i + k) % n] = nums[i]
    }

    for(let i = 0; i < n; i++) {
        nums[i] = rotated[i]
    }
};

// Optimal
// O(n) & O(1)

var rotate = function(nums, k) {
    const n = nums.length
    k = k % n
    
    reverse(nums, 0, n - 1)

    reverse(nums, k, n - 1)

    reverse(nums, 0, k - 1)
};

const reverse = (arr, s, e) => {

    while (s < e) {
        let temp = arr[s]
        arr[s] = arr[e]
        arr[e] = temp
        s++
        e--
    }
}

