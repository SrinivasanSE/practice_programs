/*
https://www.geeksforgeeks.org/floor-in-a-sorted-array/?ref=lbp
https://www.geeksforgeeks.org/ceiling-in-a-sorted-array/?ref=lbp
https://www.geeksforgeeks.org/find-floor-ceil-unsorted-array/
*/



function findFloor(arr, k) {
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


function findFloorBs(arr, x) {
        // your code here
        const n = arr.length
        let l = 0
        let r = n - 1
        
        let ans = -1
        
        while (l <= r) {
            let mid = l + Math.floor((r - l)/2)
            
            if (arr[mid] <= x) {
                ans = mid
                l = mid + 1
            } else {
                r = mid - 1
            }
        }
        
        return ans
    }
    // Function to get index of ceiling of x in arr

function ceilSearch(arr, x) {

    // If x is smaller than or equal to first element,
    // then return the first element
    if (x <= arr[0]) return 0;

    // Otherwise, linearly search for ceil value
    for (let i = 0; i < arr.length - 1; i++) {
        if (arr[i] === x) return i;
        
        // if x lies between arr[i] and arr[i+1] including
        // arr[i+1], then return arr[i+1]
        if (arr[i] < x && arr[i + 1] >= x) return i + 1;
    }
    // If we reach here then x is greater than the last element
    // of the array, return -1 in this case
    return -1;
}



class Solution {
    findCeil(arr, x) {
        // code here
        const n = arr.length
        let l = 0
        let r = n - 1
        
        let ans = -1
        
        while (l <= r) {
            let mid = l + Math.floor((r - l)/2)
            
            if (arr[mid] < x) {
                l = mid + 1
            } else {
                ans = mid
                r = mid - 1
            }
        }
        
        return ans
    }
}