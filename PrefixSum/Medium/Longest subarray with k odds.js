// https://www.geeksforgeeks.org/number-subarrays-m-odd-numbers/

class Solution {
    longestSubarrayWithKOdds(arr, k) {
        const map = new Map();
        map.set(0, -1); // prefixSum 0 at index -1 (empty prefix)

        let maxLen = 0;
        let oddCount = 0;

        for (let i = 0; i < arr.length; i++) {
            if (arr[i] % 2 !== 0) {
                oddCount += 1;
            }

            if (!map.has(oddCount)) {
                map.set(oddCount, i);
            }

            if (map.has(oddCount - k)) {
                maxLen = Math.max(maxLen, i - map.get(oddCount - k));
            }
        }

        return maxLen;
    }
}



// Count of subbarays with k odd numbers

// Sliding window approach

class Solution {
    count(n, arr, k) {
        // code here
        let oddCount = 0
        
        let count = 0, left = 0
        
        for(let right = 0; right < n; right++) {
            
            if (arr[right] % 2 != 0) {
                oddCount++
            }
            
            while (oddCount > k) {
                if (arr[left] % 2 != 0) {
                    oddCount--
                }
                left++
            }
            
            count += right - left + 1
        }
        
        return count
    }
    
    countSubarray(n, arr, k) {
        return this.count(n, arr, k) - this.count(n, arr, k - 1)
    }
}


// Prefix sum + hashmap
class Solution {
    countSubarray(n, arr, k) {
        // code here
        const hashmap = {0 : 1}
        let oddCount = 0
        
        let count = 0
        
        for(let i = 0; i < n; i++) {
            
            if (arr[i] % 2 != 0) {
                oddCount++
            }
            
            if (oddCount - k in hashmap) { // if oddCount - k is available in hashmap, that means between that index and current index, k odds are there, 5 - 3 = 2, so currently we have 5 odds and at before point there were 2 odds, so btw them 3 odds are there
                count += hashmap[oddCount - k]
            }
            
            hashmap[oddCount] = (hashmap[oddCount] || 0) + 1 // keep track of the count of the oddCount occurence, 1, 2, 1, has two odds, 1, 2, 1, 2 also has two odds, so 2 valid subarrays are there
        }
        
        return count
    }
}