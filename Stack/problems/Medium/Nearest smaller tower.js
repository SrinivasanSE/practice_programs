// https://www.geeksforgeeks.org/finding-nearest-shortest-tower-in-array/


class Solution {
    //Function to find the nearest smallest numbers to every element in the array.
    nearestSmallestTower(arr)
    {
        //your code here
        const n = arr.length
        let left = new Array(n).fill(-1)
        let stk = []
        for(let i = 0; i < n; i++) {
            while (stk.length > 0 && arr[stk[stk.length - 1]] >= arr[i]) {
                stk.pop()
            }
            if (stk.length) {
                left[i] = stk[stk.length - 1]
            }
            stk.push(i)
        }
        stk = []
        let right = new Array(n).fill(-1)
        for(let i = n - 1; i >= 0; i--) {
            while (stk.length > 0 && arr[stk[stk.length - 1]] >= arr[i]) {
                stk.pop()
            }
            if (stk.length) {
                right[i] = stk[stk.length - 1]
            }
            stk.push(i)
        }
        let res = []
        for(let i = 0; i < n; i++) {
            if (left[i] === -1 && right[i] === -1) {
                res[i] = -1
            } else if (left[i] === -1 && right[i] !== -1) {
                res[i] = right[i]
            } else if (left[i] !== -1 && right[i] === -1) {
                res[i] = left[i]
            } else if (Math.abs(i - left[i]) < Math.abs(i - right[i])) {
                res[i] = left[i]
            } else if (Math.abs(i - left[i]) > Math.abs(i - right[i])) {
                res[i] = right[i]
            } else if (arr[left[i]] < arr[right[i]]) { // if both are at the same distance, we check if left or small element is smaller
                res[i] = left[i]
            } else if (arr[left[i]] > arr[right[i]]) {
                res[i] = right[i]
            } else {
                res[i] = Math.min(left[i], right[i]) // if the distance and elements are same, we take the smallest index
            }
        }
        return res
    }
}