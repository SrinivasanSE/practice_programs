// https://www.geeksforgeeks.org/problems/search-insert-position-of-k-in-a-sorted-array/1

searchInsertK(arr,n, k)
    {
        let l = 0
        let r = n - 1
        
        if (arr[r] < k) {
            return r + 1
        }
        
        if (arr[l] > k) {
            return l
        }
        
        while (l <= r) {
            const mid = l + Math.floor((r - l)/2)
            
            if (arr[mid] === k || ((mid === 0 || arr[mid - 1] < k) && arr[mid] > k)) { // 2nd condition not needed, just return l at the end, since l = mid + 1 anyway will return the correct index if the value is not there
                return mid
                
            }
            
            if (arr[mid] < k) {
                l = mid + 1
            } else {
                r = mid - 1
            }
        }
    }
