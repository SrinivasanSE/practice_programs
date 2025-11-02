// https://www.geeksforgeeks.org/find-triplets-array-whose-sum-equal-zero/
// https://leetcode.com/problems/3sum


// ************************************************Sorting approach********************************************************

// sorting O(n^2) & O(1)

// Check whether a triplet is available or not
class Solution {
    // Function to find triplets with zero sum.
    findTriplets(arr) {
        let n = arr.length
        arr.sort((a, b) => a - b)

        for (let i = 0; i < n - 2; i++) {
            let l = i + 1
            let r = n - 1

            while (l < r) {
                const currSum = arr[i] + arr[l] + arr[r]

                if (currSum === 0) {
                    return true
                }

                if (currSum < 0) {
                    l++
                } else {
                    r--
                }
            }
        }

        return false
    }
}

// Return unique pairs

class Solution {
    triplets(arr) {
        // code here
        arr.sort((a, b) => a - b);
        const res = [];

        for (let i = 0; i < arr.length - 2; i++) {
            if (i > 0 && arr[i] === arr[i - 1]) continue; // skip duplicates

            let left = i + 1;
            let right = arr.length - 1;

            while (left < right) {
                const sum = arr[i] + arr[left] + arr[right];
                if (sum === 0) {
                    res.push([arr[i], arr[left], arr[right]]);

                    // skip duplicates
                    while (left < right && arr[left] === arr[left + 1]) left++;
                    while (left < right && arr[right] === arr[right - 1]) right--;

                    left++
                    right--
                } else if (sum < 0) {
                    left++;
                } else {
                    right--;
                }
            }
        }

        return res;
    }
}

//****************************************************************Hashing approach******************************************************************************

// hashing - O(n ^2) & O(n)
// Check whether a triplet is available or not
function findTriplets(arr) {
    let n = arr.length
    const map = new Map()
    const target = 0
    for (let i = 0; i < n - 2; i++) {
        for (let j = i + 1; j < n; j++) {
            const requiredNum = target - (arr[i] + arr[j])
            //console.log(requiredNum, arr[i], arr[j])
            if (map.has(requiredNum) && map.get(requiredNum) != i && map.get(requiredNum) != j) {
                return true
            }
            map.set(arr[j], j)
        }
    }

    //console.log(map)

    return false
}

// Return unique pairs
class Solution {

    triplets(arr) {
        // code here
        const n = arr.length;
        const tripletSet = new Set();
        const result = [];

        for (let i = 0; i < n - 2; i++) {
            const seen = new Set();

            for (let j = i + 1; j < n; j++) {
                const target = -(arr[i] + arr[j]);

                if (seen.has(target)) {
                    const triplet = [arr[i], arr[j], target].sort((a, b) => a - b);
                    const key = triplet.join(',');

                    if (!tripletSet.has(key)) {
                        tripletSet.add(key);
                        result.push(triplet);
                    }
                }

                seen.add(arr[j]);
            }
        }

        // Sort the final list of triplets lexicographically
        result.sort((a, b) => {
            for (let i = 0; i < 3; i++) {
                if (a[i] !== b[i]) return a[i] - b[i];
            }
            return 0;
        });

        return result;

    }
}