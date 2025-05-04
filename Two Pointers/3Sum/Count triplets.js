// https://www.geeksforgeeks.org/find-triplet-sum-two-equals-third-element/
// https://www.geeksforgeeks.org/count-triplets-such-that-sum-of-any-two-number-is-equal-to-third-set-2/


class Solution {
    countTriplet(arr) {
        // code here
        let count = 0
        arr.sort((a, b) => a - b)
        
        for(let i = arr.length - 1; i > 0; i--) {
            let l = 0
            let r = i - 1
            
            while (l < r) {
                let sum = arr[l] + arr[r]
                if (sum === arr[i]) {
                    count++
                    l++
                    r--
                } else if (sum < arr[i]) {
                    l++
                } else {
                    r--
                }
            }
        }
        
        return count
    }
}