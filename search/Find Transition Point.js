// https://www.geeksforgeeks.org/problems/find-transition-point-1587115620

transitionPoint(arr) {
        const n = arr.length
        let l = 0, r = n - 1
        
        while (l <= r) {
            const mid = l + Math.floor((r - l)/2)
            
            if ((mid === 0 || arr[mid - 1] === 0) && arr[mid] === 1) {
                return mid
            }
            
            if (arr[mid] === 1) {
                r = mid - 1
            } else {
                l = mid + 1
            }
        }
        
        return -1
    }
