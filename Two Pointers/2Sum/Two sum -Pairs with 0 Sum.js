// https://www.geeksforgeeks.org/problems/count-pairs-with-given-sum5022/1?page=1&category=two-pointer-algorithm&difficulty=Easy&status=unsolved&sortBy=submissions



class Solution {
    getPairs(arr) {
        // code here
        arr.sort((a, b) => a - b)
        let l = 0
        let r = arr.length - 1
        let res = []
        while (l < r) {
            if (arr[l] + arr[r] === 0) {
                res.push([arr[l], arr[r]])
                const left = arr[l]
                const right = arr[r]
                
                while (l < r && arr[l] === left) {
                    l++
                }
                while (l < r && arr[r] === right) {
                    r--
                }
            }
            else if (arr[l] + arr[r] < 0) {
                l++
            } else {
                r--
            }
        }
        
        return res
    }
}



// User function Template for javascript

/**
 * @param {number[]} arr
 * @returns {number[][]}
 */
class Solution {
    getPairs(arr) {
        // code here
        const freq = new Map();
    const result = new Set();

    // Build frequency map
    for (const num of arr) {
        freq.set(num, (freq.get(num) || 0) + 1);
    }

    // Add valid pairs as strings
    for (const num of freq.keys()) {
        if (num === 0 && freq.get(num) > 1) {
            result.add([0, 0].toString());
        } else if (num > 0 && freq.has(-num)) {
            result.add([-num, num].toString());
        }
    }

    // Convert back to arrays
    const pairs = Array.from(result).map(s => s.split(',').map(Number));

    // Sort result by first, then second value
    pairs.sort((a, b) => {
        if (a[0] !== b[0]) return a[0] - b[0];
        return a[1] - b[1];
    });

    return pairs;
}

    
}