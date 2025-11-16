// https://www.geeksforgeeks.org/count-1s-sorted-binary-array/

class Solution {
    countZeroes(arr) {
        // write your code here
        let n = arr.length
        let l = 0
        let h = n - 1
        let count = 0
        while (l <= h) {
            const mid = l + Math.floor((h - l)/2)
            if ((mid === 0 || arr[mid - 1] === 1) && arr[mid] === 0) {        // for counting 1s, if((mid === high || arr[mid + 1] === 0) && arr[mid] === 1) {  return mid + 1 }
                return n - mid
            }
            if (arr[mid] === 1) {
                l = mid + 1
            }
            else {
                h = mid - 1
            }
        }
        
        
        
    }
}
