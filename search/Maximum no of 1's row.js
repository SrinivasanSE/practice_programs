// https://www.geeksforgeeks.org/problems/maximum-no-of-1s-row3027/1?page=2&category=Searching&difficulty=Easy&sortBy=submissions

class Solution{
    
    findCount(arr, l, r) {
        const n = arr.length
        
        while (l <= r) {
            const mid = l + Math.floor((r - l)/2)
            
            if ((mid === 0 || arr[mid - 1] === 0) && arr[mid] === 1) {
                return n - mid // for counting 0, just return mid
            }
            
            if (arr[mid] === 0) {
                l = mid + 1
            } else {
                r = mid - 1
            }
        }
    }
    maxOnes(mat, n, m){
        let maxCount =-1
        let res = 0
        
        for(let i = 0; i < n; i++) {
            const count = this.findCount(mat[i], 0, m - 1)
            if (count > maxCount) {
                maxCount = count
                res = i
            }
        }
        
        return res
    }


     maxOnes(mat, n, m){
        let maxCount =-1
        let r = 0
        let c = m - 1
        
        while (r < n && c >= 0) {
            if (mat[r][c] === 0) {   // means there are no 1s left anyway once we reach the 0, so we move to the next row
                r++
            } else {
                maxCount = r
                c--
            }
        }
        
        return maxCount
    }
}
