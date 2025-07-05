// https://www.geeksforgeeks.org/intersection-of-two-arrays-with-distinct-elements/



class Solution {
    // Function to return the count of the number of elements in
    // the intersection of two arrays.
    numberofElementsInIntersection(a, b) {
        // code here
        const set = new Set()
        
        for (let num of a) {
            set.add(num)
        }
        let count = 0
        
        for(let num of b) {
            if (set.has(num)) {
                count+=1
                set.delete(num)
            }
        }
        
        return count
    }
}


class Solution {
    // Function to return the count of the number of elements in
    // the intersection of two arrays.
    numberofElementsInIntersection(a, b) {
        // code here
        a.sort((a, b) => a - b)
        b.sort((a, b) => a - b)
        
        let i = 0, j = 0, count = 0
        
        while (i < a.length && j < b.length) {
            if (a[i] === b[j]) {
                count++
                i++
                j++
            }
            else if (a[i] < b[j]) {
                i++
            } else {
                j++
            }
        }
        
        return count
    }
}


class Solution {
    // Function to return the count of the number of elements in
    // the intersection of two arrays.
    binarySearch(arr, l, r, target) {
        while (l <= r) {
            const mid = l + Math.floor((r - l)/2)
            
            if (arr[mid] === target) {
                return 1
            }
            if (arr[mid] < target) {
                l = mid + 1
            } else {
                r = mid - 1
            }
        }
        
        return -1
    }
    numberofElementsInIntersection(a, b) {
        // code here
        a.sort((a, b) => a - b)
        b.sort((a, b) => a - b)
        
        let i = 0, j = 0, count = 0
        
        for(let i = 0; i < a.length; i++) {
            
            if (this.binarySearch(b, 0, b.length - 1, a[i]) != -1) {
                count++
            }
        }
       
        
        return count
    }
}