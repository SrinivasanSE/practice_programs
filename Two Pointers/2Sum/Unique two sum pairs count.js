// https://www.geeksforgeeks.org/2-sum-find-all-pairs-with-zero-sum/

// JavaScript Code to find all pairs with zero sum using hashing

function zeroSumPairsOnePass(arr) {
    const map = new Map();  // value -> list of indices
    const result = [];

    for (let i = 0; i < arr.length; i++) {
        const complementIndices = map.get(-arr[i]);
        if (complementIndices) {
            for (let j of complementIndices) {
                if (j < i) result.push([j, i]);
            }
        }
        if (!map.has(arr[i])) {
            map.set(arr[i], []);
        }
        map.get(arr[i]).push(i);
    }

    return result;
}

// this returns count alone and not pairs
class Solution {
    getPairsCount(arr, k) {
        const m = new Map();
        const n = arr.length;
        let twice_count = 0;

        for (let i = 0; i < n; i++) {
            m.set(arr[i], (m.get(arr[i]) || 0) + 1);
        }

        for (let i = 0; i < n; i++) {
            twice_count += m.get(k - arr[i]) || 0;
            if (k - arr[i] === arr[i]) {
                twice_count--;
            }
        }

        return Math.floor(twice_count / 2);
    }
}