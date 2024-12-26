/*
https://www.geeksforgeeks.org/floor-in-a-sorted-array/?ref=lbp
https://www.geeksforgeeks.org/ceiling-in-a-sorted-array/?ref=lbp
https://www.geeksforgeeks.org/find-floor-ceil-unsorted-array/
*/



findFloor(arr, k) {
        if (arr[0] > k) {
            return -1
        }
        
        const n = arr.length
        
        if (arr[n - 1] <= k) {
            return n - 1
        }
        
       
        
        for(let i = 1; i < n; i++) {
            if (arr[i] > k) {
                return i - 1
            }
        }
        
        return -1
    }
