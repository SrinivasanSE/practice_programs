//https://www.geeksforgeeks.org/two-elements-whose-sum-is-closest-to-zero/

class Solution {

    closestToZero(arr,n){
        arr.sort((a, b) => a - b)
        let res = Infinity
        let i = 0, j = n - 1
        let diff = Infinity
        
        while ( i < j) {
            let curr = arr[i] + arr[j]
            
            if (curr === 0) {
                return 0
            }
        
            
            if (Math.abs(curr) < Math.abs(diff)) {
                res = curr
                diff = curr
            } else if (Math.abs(curr) === Math.abs(diff)) {
                res = Math.max(res, curr)
            }
            
            if (curr > 0) {
                j--
            } else {
                i++
            }
        }
        
        return res
    }
}
