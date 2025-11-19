// https://www.geeksforgeeks.org/given-an-array-of-of-size-n-finds-all-the-elements-that-appear-more-than-nk-times/
// https://www.geeksforgeeks.org/boyer-moore-majority-voting-algorithm/


/*

Brute

O(n^2) & O(1)

*/

function moreThanNbyKBrute(arr, k) {
    const n = arr.length;
    const res = [];
    for (let i = 0; i < n; i++) {
        let count = 0;
        for (let j = 0; j < n; j++) {
            if (arr[i] === arr[j]) count++;
        }
        if (count > Math.floor(n / k) && !res.includes(arr[i])) {
            res.push(arr[i]);
        }
    }
    return res;
}

/*

Better

O(n) & O(k)

*/

function moreThanNbyKBetter(arr, k) {
    const n = arr.length;
    const freq = {};
    for (const num of arr) {
        freq[num] = (freq[num] || 0) + 1;
    }
    const res = [];
    for (const num in freq) {
        if (freq[num] > Math.floor(n / k)) {
            res.push(Number(num));
        }
    }
    return res;
}

/*

Optimal

O(n*k) & O(k)

*/

class Solution {
    // Function to find all elements in array that appear more than n/k times.
    countOccurence(arr, k) {
        // your code here
        if (k < 2) return 0
        const candidates = new Map()
        
        for (let num of arr) {
            if (candidates.has(num)) {
                candidates.set(num, candidates.get(num) + 1)
            } else if (candidates.size < k - 1) {
                candidates.set(num, 1)
            } else {
                for (let [key, value] of candidates) {
                    if (value - 1 === 0) {
                        candidates.delete(key)
                    } else {
                    candidates.set(key, value - 1)
                    }
                }
            }
        }
        
        const actualCounts = new Map()
        
        for (let num of arr) {
            if (candidates.has(num)) {
                actualCounts.set(num, (actualCounts.get(num) || 0) + 1)
            }
        }
        
        let count = 0
        
        for (let [key, value] of actualCounts) {
            if (value > Math.floor(arr.length/k)) {
                count++
            }
        }
        
        return count
    }
}