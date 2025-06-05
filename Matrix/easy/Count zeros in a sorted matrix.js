// https://www.geeksforgeeks.org/count-zeros-in-a-row-wise-and-column-wise-sorted-matrix/



class Solution {

    countZeros(A, N) {
        // code here
        let count = 0
        
        let row = N - 1
        let col = 0
        
        while (col < N) {
            
            while (row >= 0 && A[row][col] != 0) { // since the row and col are sorted, we start from the bottom left 
            // and go up till we find 0, from the top till that row, all will start with 0 only, then we move to the next col keeping the row same
                row--
            }
            
            count += row + 1
            
            col++
        }
        
        return count
    }
}



class Solution {
    
    binarySearch(arr, l, r) {
        while (l <= r) {
            const mid = l + Math.floor((r - l)/2)
            if (arr[mid] === 0) {
                l = mid + 1
            }
            else {
                r = mid - 1
            }
        }
        
        return l
    }
    
    countZeros(A, N) {
        // code here
        let count = 0
        
        for(let i = 0; i < N; i++) {
            if (A[0][0] != 1) {
                count += this.binarySearch(A[i], 0, N - 1)
            }
        }
        
        return count
    }
}