https://www.geeksforgeeks.org/find-the-missing-number/

missingNumber(arr) {
        const n = arr.length + 1
        const hashArr = new Array(n).fill(0)
        for(let i = 0; i < n - 1; i++) {
            hashArr[arr[i] - 1]++
        }
        for(let i = 0 ; i < n; i++) {
            if (hashArr[i] === 0 ) {
                return i + 1
            }
        }
    }


class Solution {
    // Function to find the missing number in the array.
    missingNumber(arr) {
        const n = arr.length + 1
        const sum = arr.reduce((accum, curr) => accum + curr, 0)
        const expectedSum = ((n)*(n+1))/2
        return expectedSum - sum
    }
}
