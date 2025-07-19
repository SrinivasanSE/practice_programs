// https://www.geeksforgeeks.org/search-an-element-in-a-sorted-and-pivoted-array/

class Solution {
    
    binarySearch(arr, l, r, target) {
        while (l <= r) {
            const mid = l + Math.floor((r - l)/2)
            
            if (arr[mid] === target) {
                return mid
            }
            
            if (arr[mid] < target) {
                l = mid + 1
            } else {
                r = mid - 1
            }
        }
        
        return -1
    }
    search(arr, key) {
        const n = arr.length
       const pivot = this.findPivot(arr)
       
       if (arr[pivot] === key) {
           return pivot
       }
       
       if (pivot === 0) {
           return this.binarySearch(arr, 0, n - 1, key)
       } 
       if (arr[0] <= key) {
           return this.binarySearch(arr, 0, pivot - 1, key)
       }
       
       return this.binarySearch(arr, pivot + 1, n - 1, key)
    }
    
    findPivot(arr) {
        const n = arr.length
        let l = 0
        let r = n - 1
        
        while (l < r) {
            const mid = l + Math.floor((r - l)/2)
            
            if (arr[l] <= arr[r]) {
                return l
            }
            
            if (arr[mid] < arr[r]) {
                r = mid
            } else {
                l = mid + 1
            }
        }
        
        return l
    }
}

/*
Optimal - without duplicate
O(logn) & O(1)
*/


function search(arr, key) {
        const n = arr.length
       let l = 0
       let r = n - 1
       
       while (l <= r) {
           const mid = l + Math.floor((r - l)/2)
           
           if (arr[mid] === key) { // mid is already covered here, so no need to include in below conditions
               return mid
           }
           
           if (arr[l] <= arr[mid]) { // if true, all numbers are sorted in ascending order between them.
               
               if (arr[l] <= key && arr[mid] > key) {   // between l & mid
                   r = mid - 1
               } else {
                   l = mid + 1
               }
           } else {
               if (arr[mid] < key && key <= arr[r]) {  // between mid & r
                   l = mid + 1
               } else {
                   r = mid - 1
               }
           }
       }
       
       return -1
    }

// with duplicates

var search = function(nums, target) {
    const n = nums.length
    let l = 0, r = n - 1

    while (l <= r) {
        let mid = l + Math.floor((r - l)/2)
        if (nums[mid] === target) {
            return true
        }

        if (nums[l] === nums[mid]) {
            l++
            continue
        }

        if (nums[l] <= nums[mid]) {
            if (nums[l] <= target && target < nums[mid]) {
                r = mid - 1
            } else {
                l = mid + 1
            }
        } else {
            if (nums[mid] < target && target <= nums[r]  ) {
                l = mid + 1
            } else {
                r = mid - 1
            }
        }
    }

    return false
};