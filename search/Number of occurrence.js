// https://www.geeksforgeeks.org/problems/number-of-occurrence2259/1?page=1&category=Searching&difficulty=Easy&sortBy=submissions
// Left most and right most index - https://www.geeksforgeeks.org/problems/find-first-and-last-occurrence-of-x0849/1?page=1&category=Searching&difficulty=Easy&sortBy=submissions

class Solution {
    // Function to count the occurrences of x in the array.
    countFreq(arr, target) {
        
        const n = arr.length
        const first = this.first(arr, 0, n - 1, target)
        if (first === -1) {
            return 0
        }
        const last = this.last(arr, 0, n - 1, target)
        
        return last - first + 1
        
    }
    
    first(arr, l, r, target) {
        let res = -1
        while (l <= r) {
            const mid = l + Math.floor((r - l)/2)
            
            if (arr[mid] === target) {
                r = mid - 1
                res = mid
            }
            else if (arr[mid] < target) {
                l = mid + 1
            } else {
                r = mid - 1
            }
        }
        
        return res
    }
    
    last(arr, l, r, target) {
        let res = -1
        while (l <= r) {
            const mid = l + Math.floor((r - l)/2)
            
            if (arr[mid] === target) {
                l = mid + 1
                res = mid
            }
            else if (arr[mid] < target) {
                l = mid + 1
            } else {
                r = mid - 1
            }
        }
        
        return res
    }
}

countFreq(arr, target) {
        
        const n = arr.length
        let count = 0
        let l = 0, r = n - 1
        while (l <= r) {
            if (arr[l] === target) {
                count++
            }
            if (arr[r] === target && l != r) {
                count++
            }
            l++
            r--
        }
        
        return count
    }

// https://www.geeksforgeeks.org/problems/first-and-last-occurrences-of-x2041/1?page=2&category=Searching&difficulty=Easy&sortBy=submissions

class Solution:

    def first(self, arr, low, high, x, n):
        if high >= low:
            mid = low + (high - low) // 2
            if (mid == 0 or x > arr[mid - 1]) and arr[mid] == x:
                return mid
            elif x > arr[mid]:
                return self.first(arr, mid + 1, high, x, n)
            else:
                return self.first(arr, low, mid - 1, x, n)
        return -1

    def last(self, arr, low, high, x, n):
        if high >= low:
            mid = low + (high - low) // 2
            if (mid == n - 1 or x < arr[mid + 1]) and arr[mid] == x:
                return mid
            elif x < arr[mid]:
                return self.last(arr, low, mid - 1, x, n)
            else:
                return self.last(arr, mid + 1, high, x, n)
        return -1

    def firstAndLast(self, x, arr):
        n = len(arr)
        f = self.first(arr, 0, n - 1, x, n)
        l = self.last(arr, 0, n - 1, x, n)
        if f == l and f == -1:
            return [-1]
        else:
            return [f, l]
