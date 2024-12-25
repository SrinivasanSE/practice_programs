// https://www.geeksforgeeks.org/find-the-maximum-element-in-an-array-which-is-first-increasing-and-then-decreasing/

findMaximum(arr) {
        let n = arr.length
        let mx = arr[0]
        for(let i = 1; i < n; i++) {
           if (arr[i] > mx) {
               mx = arr[i]
           } else {
               break
           }
        }
        
        return mx
}


findMaximum(arr) {
        let n = arr.length
        if (n === 1 || arr[0] > arr[1] ) {
            return arr[0]
        }
        
        if ( arr[n - 1] > arr[n-2]) {
            return arr[n-1]
        }
        
        return this.binarySearch(1, n - 2, arr)
        
}

    binarySearch(l, r, arr) {
        while (l <= r) {
            const mid = l + Math.floor((r - l)/2)
            if (arr[mid] > arr[mid - 1] && arr[mid] > arr[mid + 1]) {
                return arr[mid]
            }
            
            if (arr[mid] < arr[mid + 1]) {
                l = mid + 1
            } else {
                r = mid - 1
            }
        }
        
         return arr[r]
        
    }
