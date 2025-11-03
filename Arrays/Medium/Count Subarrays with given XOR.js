// https://www.geeksforgeeks.org/dsa/count-number-subarrays-given-xor/

// Similar to Arrays/Medium/560. Count of Subarray Sum Equals K.js

/*

Brute - Checking all subarrays
O(n^2) & O(1)

*/

function subarrayXor(arr, k) {
    let res = 0;

    // Pick starting point i of subarrays
    for (let i = 0; i < arr.length; i++) {
        let prefXOR = 0;

        // Pick ending point j of subarray for each i
        for (let j = i; j < arr.length; j++) {
        
            // calculate prefXOR for subarray arr[i ... j]
            prefXOR ^= arr[j];

            // If prefXOR is equal to given value, increase res by 1
            if (prefXOR === k)
                res++;
        }
    }
    return res;
}

/*
Optimal

O(n) & O(1)

*/

class Solution {
    subarrayXor(arr, k) {
        // your code here
        const n = arr.length
        let xor = 0, rem, count = 0
        let hashmap = new Map()
        hashmap.set(0, 1)
        
        for(let i = 0; i < n; i++) {
            xor ^= arr[i]
            rem = xor^k // xor with k to get the remaining required, if k is 6, and xor is 4 and arr[i] is 6, 4^6 = 2 & 2 ^ 6 = 4
            
            if (hashmap.has(rem)) { // we know the xor upto the current index and also the subarray's target which is k, if the xor of them is available in the hashmap, that means it's possible to get the subarray with xor k
                count += hashmap.get(rem)
            }
            
            hashmap.set(xor, (hashmap.get(xor) || 0) + 1)
        }
        
        return count
    }
}


/*
## 2. **The Key Property**

Let’s define:
- **A**: XOR of elements from index 0 to i (**prefix XOR up to i**)
- **B**: XOR of elements from index i+1 to j (**XOR of subarray (i+1 to j)**)
- **C**: XOR of elements from index 0 to j (**prefix XOR up to j**)

**Property:**  
If you XOR two prefixes, you get the XOR of the elements between them:  
`A ⊕ B = C`  
So,  
`B = A ⊕ C`  
or rearranged,  
`A = C ⊕ B`

---

## 3. **Applying to Subarray XOR Problems**

Suppose you want to find the number of subarrays whose XOR is **k**.

- For a subarray ending at index `j` and starting at index `i+1`, the XOR is `B`.
- If the XOR of the prefix up to `j` is `C`, and the XOR up to `i` is `A`, then  
  `B = C ⊕ A`  
  (since XORing the prefix up to `i` cancels out the first part of the prefix up to `j`, leaving only the subarray).

- If you want `B = k`,  
  then `A = C ⊕ k`.

---

## 4. **How to Use This in Practice**

- As you iterate through the array, keep track of the prefix XOR up to each index (`C`).
- For each index, check if there is a previous prefix XOR (`A`) such that `A = C ⊕ k`.
- If such an `A` exists, then there is a subarray ending at `j` whose XOR is `k`.

---

*/