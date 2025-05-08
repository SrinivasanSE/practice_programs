// https://www.geeksforgeeks.org/find-a-triplet-that-sum-to-a-given-value/


class Solution {
    // Function to find if there exists a triplet in the array arr[] which sums up to
    // target
    hasTripletSum(arr, target) {
        // your code here
        arr.sort((a, b) => a - b)
        const n = arr.length
        for(let i = 0; i < n - 2; i++) {
            let l = i + 1
            let r = n - 1
            
            while (l < r) {
                const currSum = arr[i] + arr[l] + arr[r]
                
                if (currSum === target) {
                    return true
                }
                
                if (currSum < target) {
                    l++
                } else {
                    r--
                }
            }
        }
        
        return false
    }
}


class Solution {
    hasTripletSum(arr, target) {
        // your code here
        const n = arr.length
        const map = new Map()
        
        for(let i = 0; i < n - 2; i++) {
            
            for(let j = i + 1; j < n; j++) {
                
                const reqSum = target - (arr[i] + arr[j])
                if (map.has(reqSum) && map.get(reqSum) != i && map.get(reqSum) != j) {
                    return true
                }
                
                map.set(arr[j], j)
            }
        }
        
        return false
    }
}

class Solution {
    // Function to find if there exists a triplet in the array arr[] which sums up to target
    hasTripletSum(arr, target) {
        arr.sort((a, b) => a - b);
        const n = arr.length;

        for (let i = 0; i < n - 2; i++) {
            // Use twoSum to find if there exists a pair that sums up to (target - arr[i])
            if (this.twoSum(arr, i + 1, n - 1, target - arr[i])) {
                return true;
            }
        }

        return false;
    }

    // Helper function to find if there exists a pair in arr[l...r] which sums up to target
    twoSum(arr, l, r, target) {
        while (l < r) {
            const currSum = arr[l] + arr[r];
            if (currSum === target) {
                return true;
            }
            if (currSum < target) {
                l++;
            } else {
                r--;
            }
        }
        return false;
    }
}