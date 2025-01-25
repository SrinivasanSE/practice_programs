// https://www.geeksforgeeks.org/boyer-moore-majority-voting-algorithm/
// https://www.geeksforgeeks.org/majority-element/
// https://www.geeksforgeeks.org/boyer-moore-majority-voting-algorithm/

// O(n) & O(1)
class Solution {

    majorityElement(arr) {
        let count = 0, candidate = -1
        const n = arr.length
        if (n === 1) {
            return arr[0]
        }
        arr.forEach((num) => {
            if (count === 0) {
                candidate = num
                count = 1
            } else {
                if (candidate === num) {
                    count++
                } else {
                    count--
                }
            }
        })
        count = 0
        arr.forEach((num) => {
            if (num === candidate) {
                count++
            }
        })
        
        if (count > Math.floor(n/2 )) {
            return candidate
        }
        
        return -1
    }
}
