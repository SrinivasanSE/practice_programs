// https://www.geeksforgeeks.org/find-minimum-element-in-a-sorted-and-rotated-array/
// https://www.geeksforgeeks.org/maximum-element-in-a-sorted-and-rotated-array/
// https://www.geeksforgeeks.org/problems/rotation4723/1?page=1&category=Searching&difficulty=Easy&sortBy=submissions
// https://www.geeksforgeeks.org/find-rotation-count-rotated-sorted-array/
// https://www.geeksforgeeks.org/problems/minimum-number-in-a-sorted-rotated-array-1587115620/1

function findMin(arr) {
        const n = arr.length
        let l = 0
        let r = n - 1
        
        while(l < r) {
            const mid = l + Math.floor((r - l)/2)
            
            //console.log(mid, arr[mid], l, r)
            
            if (arr[l] < arr[r]) {
                return arr[l]
            }
            
            if(arr[mid] < arr[r] ) {  // [5,6,7,8,9,10,1,2,3] if 9 > 3, then the min element wil be in the right half, else if 1 < 4, it will be in the left half
                r = mid // not mid - 1 because mid can be the min element
            } else {
                l = mid + 1
            }
        }
        
        return arr[l]
    }
