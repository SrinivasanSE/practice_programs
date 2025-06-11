// https://www.geeksforgeeks.org/minimum-number-platforms-required-railwaybus-station/

/*
The Sweep Line Algorithm is an efficient technique for solving interval-based problems. 
It works by treating each train's arrival and departure times as events on a timeline. 
By processing these events in chronological order, we can track the number of trains at the station at any moment, 
which directly indicates the number of platforms required at that time. 
The maximum number of overlapping trains during this process determines the minimum number of platforms needed.
*/

class Solution {
    findPlatform(arr, dep) {
        // your code here
        
        const n = arr.length
        const maxDept = Math.max(...dep)
        let count = 0
        let max = 0
        const v = new Array(maxDept + 2).fill(0) // we use index + 1, so there should be enough space
        
        for(let i = 0; i < n; i++) {
            v[arr[i]]++
            v[dep[i] + 1]-- // we add 1 to mark the next minute as free, if two train arrive and depart at the same time, it will give wrong output if we don't add 1
        }
        
        for(let i = 0; i <= maxDept + 1; i++) {
            count += v[i]
            max = Math.max(max, count )
        }
        
        return max
        
    }
}

class Solution {
    // Function to find the minimum number of platforms required at the
    // railway station such that no train waits.
    findPlatform(arr, dep) {
        // your code here
        arr.sort((a, b) => a - b)
        dep.sort((a, b) => a - b)
        
        let i = 0, j = 0
        
        const n = arr.length
        let platforms = 0, max = 0
        while (i < n && j < n) {
            if (arr[i] <= dep[j]) {
                platforms++
                max = Math.max(max, platforms)
                i++
            } else {
                platforms-=1
                j++
            }
        }
        
        return max
    }
}


class Solution {
    findPlatform(arr, dep) {
        // your code here
        
        const n = arr.length
        let platforms = 0, max = 0
        
        for(let i = 0; i < n; i++) {
            platforms = 1
            
            for(let j = 0; j < n; j++) {
                if (i != j) {
                if (arr[i] >= arr[j] && arr[i] <= dep[j]) {
                    platforms++
                }}
            }
            
            max = Math.max(max, platforms)
        }
        
        
        return max
    }
}