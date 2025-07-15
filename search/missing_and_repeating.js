//https://www.geeksforgeeks.org/find-a-repeating-and-a-missing-number/


/*

Brute - Two loops

*/


/*

Better - Hashmap

O(n) & O(n)

*/

class Solution {
    // Function to find two repeating elements in an array of size n.
    findTwoElement(arr) {
        let res1,res2
        let n = arr.length
        let hashmap = new Array(n + 1).fill(0)
        for(let i = 0; i < n; i++) {
            hashmap[arr[i]]++
            if(hashmap[arr[i]] > 1) {
                res2 = arr[i]
            }
        }
        for(let i = 1; i <=n; i++) {
            if(hashmap[i] === 0) {
                res1 = i
                break
            }     
        }
        
        return [res2, res1]
    }
}

/*

Optimal - Using array index negative
O(n) & O(1)

*/

class Solution {
    // Function to find two repeating elements in an array of size n.
    findTwoElement(arr) {
        let repeating
        let n = arr.length
        let sum = n*(n + 1)/2
        for(let i = 0; i < n; i++) {
            const index = Math.abs(arr[i])
            if (arr[index - 1] > 0) {
                arr[index - 1] *= -1 // make the value at the index negative, so if we find the same num again, it will be already negative and go to else block
                sum -= index
            } else {
                repeating = index
            }
        }
        
        return [repeating, sum]
    }
}


/*

Optimal - Maths
O(n) & O(1)

*/

function findMissingRepeatingNumbers(a) {
    const n = a.length; // size of the array

    // Find Sn and S2n:
    const SN = (n * (n + 1)) / 2;
    const S2N = (n * (n + 1) * (2 * n + 1)) / 6;

    // Calculate S and S2:
    let S = 0, S2 = 0;
    for (let i = 0; i < n; i++) {
        S += a[i];
        S2 += a[i] * a[i];
    }

    //S-Sn = X-Y:
    const val1 = S - SN;

    // S2-S2n = X^2-Y^2:
    let val2 = S2 - S2N;

    //Find X+Y = (X^2-Y^2)/(X-Y):
    val2 = val2 / val1;

    //Find X and Y: X = ((X+Y)+(X-Y))/2 and Y = X-(X-Y),
    // Here, X-Y = val1 and X+Y = val2:
    const x = (val1 + val2) / 2;
    const y = x - val1;

    return [x, y];
}