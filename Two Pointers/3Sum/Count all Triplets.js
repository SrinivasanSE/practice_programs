// https://www.geeksforgeeks.org/3-sum-count-all-triplets-with-given-sum/

// Similar to Two Pointers/2Sum/Count pairs with given sum.js

class Solution {
    countTriplets(arr, target) {
        // code here
        arr.sort((a, b) => a - b)
        
        let l,r, res = 0, sum
        const n = arr.length
        
        for(let i = 0; i < n - 2; i++) {
            l = i + 1
            r = n - 1
            
            while (l < r) {
                sum = arr[i] + arr[l] + arr[r]
                
                if (sum < target) {
                l++
            } else if (sum > target) {
                r--
            } else {
                let c1 = 0, c2 = 0
                const left = arr[l]
                const right = arr[r]
                while (l <= r && arr[l] === left) {
                    c1++
                    l++
                }
                
                while (l <= r && arr[r] === right) {
                    c2++
                    r--
                }
                
                if (left === right) {
                    res += c1*(c1 - 1)/2   // nc2 for ex: 4c2 The number of ways to choose two elements from cnt1 identical elements is given by the combination formula: C(cnt1,2)=cnt1×(cnt1−1)2\text{C}(cnt1, 2) = \frac{cnt1 \times (cnt1 - 1)}{2}C(cnt1,2)=2cnt1×(cnt1−1)​.

                } else {
                    res += c1*c2
                }
            }
            }
        }
        
        return res
    }
}


class Solution {
    countTriplets(arr, target) {
        // code here
        
        let res = 0
        const n = arr.length
        let map
        for(let i = 0; i < n - 2; i++) {
            map = new Map()
            for (let j = i + 1; j < n; j++) {
                const reqSum = target - (arr[i] + arr[j])
                
                if (map.has(reqSum)) {
                    res+= map.get(reqSum)
                }
                
                map.set(arr[j], (map.get(arr[j]) || 0) + 1)
            }
            
        }
        
        return res
    }
}