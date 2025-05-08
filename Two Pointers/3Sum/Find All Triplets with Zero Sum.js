// https://www.geeksforgeeks.org/find-triplets-array-whose-sum-equal-zero/


  function findTriplets(arr) {
        const res = []
        const n = arr.length
        const map = new Map()
        
        for(let i = 0; i < n; i++) {
            if(!map.has(arr[i])) {
                map.set(arr[i], [])
            }
            
            map.get(arr[i]).push(i)
        }
        
        for(let i = 0; i < n - 2; i++) {
            for(let j = i + 1; j < n; j++) {
                const sum = arr[i] + arr[j]
                const reqNum = -sum
                if(map.has(reqNum)) {
                    const pairs = map.get(reqNum)
                    for(let k of pairs) {
                        if (k != i && k != j && i < j && j < k) {
                            res.push([i, j, k])
                        }
                    }
                }
            }
        }
        
        return res
    }


// https://www.geeksforgeeks.org/print-all-triplets-with-given-sum/
    class Solution {
        /**
         * @param {number[]} arr
         * @param {number} target
         * @return {number[][]}
         */
        threeSum(arr, target) {
            // write your code here
        // Sort the array to apply two-pointer technique
            arr.sort((a, b) => a  - b)
            
            const n = arr.length
            const res = []
            for(let i = 0; i < n - 2; i++) {
                for (let j = i + 1; j < n - 1; j++) {
                    for (let k = j + 1; k < n; k++) {
                        const sum = arr[i] + arr[j] + arr[k]
                        if (sum < target) {
                            continue
                        }
                        if (sum === target) {
                            res.push([arr[i], arr[j], arr[k]])
                        } else {
                            break
                        }
                    }
                }
            }
            
            return res
        }
    }


    // this will output the index and not the values

function findTriplets(arr, target) {

    // Set to handle duplicates
    let resSet = new Set();
    let n = arr.length;
    let mp = new Map();

    // Store sum of all the pairs with their indices
    for (let i = 0; i < n; i++) {
        for (let j = i + 1; j < n; j++) {
            let sum = arr[i] + arr[j];
            if (!mp.has(sum)) {
                mp.set(sum, []);
            }
            mp.get(sum).push([i, j]);
        }
    }

    for (let i = 0; i < n; i++) {

        // Find remaining value to get sum equal to target
        let rem = target - arr[i];
        if (mp.has(rem)) {
            let pairs = mp.get(rem);
            for (let p of pairs) {
              
                // Ensure no two indices are the same in the triplet
                if (p[0] != i && p[1] != i) {
                    let curr = [i, p[0], p[1]].sort((a, b) => a - b);
                    resSet.add(curr.join(","));
                }
            }
        }
    }
    return Array.from(resSet).map(triplet => triplet.split(",").map(Number));
}
