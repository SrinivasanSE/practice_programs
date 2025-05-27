// https://www.geeksforgeeks.org/largest-subarray-with-equal-number-of-0s-and-1s/
// https://www.geeksforgeeks.org/count-subarrays-equal-number-1s-0s/

class Solution {
    maxLen(arr) {
        const n = arr.length;
        let hashmap = {};
        let max = 0;
        let prefixSum = 0;

        for (let i = 0; i < n; i++) {
            prefixSum += (arr[i] == 0 ? -1 : 1);

            if (prefixSum === 0) {
                max = Math.max(max, i + 1); 
            }

            if (prefixSum in hashmap) { // if the prefix sum is already there, that means the elements between that index and current index contributed to 0 sum
                max = Math.max(max, i - hashmap[prefixSum]); 
            } else {
                hashmap[prefixSum] = i;
            }
        }

        return max;
    }
}


// Count subarrays with equal num of 1s and s

class Solution {
    // Function to count subarrays with 1s and 0s.
    countSubarrWithEqualZeroAndOne(arr, n) {
        // code here
        let prefixSum = 0
        let count = 0
        
        let hashmap = {}
        
        for(let i = 0; i < n; i++) {
            prefixSum += arr[i] === 0 ? -1 : 1
            if (prefixSum === 0) {
                count++
            }
            
            if (prefixSum in hashmap) {
                count+= hashmap[prefixSum]
            } 
            
            hashmap[prefixSum] = (hashmap[prefixSum] || 0) + 1
        }
        
        return count
    }
}

// https://www.geeksforgeeks.org/longest-span-sum-two-binary-arrays/

function longestCommonSum(a,b,n)
{
    // Find difference between the two
        let arr = new Array(n);
        for (let i = 0; i < n; i++)
            arr[i] = a[i] - b[i];
 
        // Creates an empty hashMap hM
        let hM = new Map();
 
        let sum = 0;     // Initialize sum of elements
        let max_len = 0; // Initialize result
 
        // Traverse through the given array
        for (let i = 0; i < n; i++)
        {
            // Add current element to sum
            sum += arr[i];
 
            // To handle sum=0 at last index
            if (sum == 0)
                max_len = i + 1;
 
            // If this sum is seen before,
            // then update max_len if required
            if (hM.has(sum))
                max_len = Math.max(max_len, i - hM.get(sum));
             
            else // Else put this sum in hash table
                hM.set(sum, i);
        }
        return max_len;
}