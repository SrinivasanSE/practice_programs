// https://www.geeksforgeeks.org/count-of-subarrays-having-exactly-k-distinct-elements/

class Solution {
    _exactlyK(arr, k) {
        const n = arr.length
        let count = 0
        
        const hashmap = new Map()
        
        let start = 0
        
        for(let end = 0; end < n; end++) {
            hashmap.set(arr[end], (hashmap.get(arr[end]) ||  0) + 1)
            
            while (hashmap.size > k) {
                hashmap.set(arr[start], hashmap.get(arr[start]) - 1)
                if (hashmap.get(arr[start]) === 0) {
                    hashmap.delete(arr[start])
                }
                start+=1
            }
            
            count += end - start + 1
            
        }
        
        return count
    }
    exactlyK(arr, k) {
        // Your Code goes here
        return this._exactlyK(arr, k) - this._exactlyK(arr, k - 1)
    }
}


// https://www.geeksforgeeks.org/count-subarrays-with-at-most-k-distinct-elements/

class Solution {
    atMostK(arr, k) {
        // Your Code goes here
        let start = 0, count = 0
        let hashmap = new Map()
        
        const n = arr.length
        
        for(let end = 0; end < n; end++) {
            hashmap.set(arr[end], (hashmap.get(arr[end]) || 0) + 1)
            
            if (hashmap.get(arr[end]) === 1) {
                k--
            }
            
            while (k < 0) {
                hashmap.set(arr[start], (hashmap.get(arr[start]) || 0) - 1)
                if(hashmap.get(arr[start]) === 0) {
                    k+=1
                }
                start+=1
            }
            
            count += end - start + 1
        }
        
        return count
    }
}


// https://www.geeksforgeeks.org/count-number-of-substrings-with-exactly-k-distinct-characters/

function count(s, k) {
    let n = s.length;
    let ans = 0;

    // Use sliding window technique
    let freq = new Array(26).fill(0);
    let distinctCnt = 0;
    let i = 0;

    for (let j = 0; j < n; j++) {

        // Expand window and add character
        freq[s.charCodeAt(j) - 'a'.charCodeAt(0)]++;
        if (freq[s.charCodeAt(j) - 'a'.charCodeAt(0)] === 1) distinctCnt++;

        // Shrink window if distinct characters exceed k
        while (distinctCnt > k) {
            freq[s.charCodeAt(i) - 'a'.charCodeAt(0)]--;
            if (freq[s.charCodeAt(i) - 'a'.charCodeAt(0)] === 0) distinctCnt--;
            i++;
        }

        // Add number of valid substrings ending at j
        ans += j - i + 1;
    }

    return ans;
}

// Function to find the number of substrings
// with exactly k Distinct characters.
function countSubstr(s, k) {
    let ans = 0;

    // Subtract substrings with at most 
    // k-1 distinct characters from substrings
    // with at most k distinct characters
    ans = count(s, k) - count(s, k - 1);

    return ans;
}
