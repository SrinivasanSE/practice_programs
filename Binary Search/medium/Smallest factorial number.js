// https://www.geeksforgeeks.org/smallest-number-least-n-trailing-zeroes-factorial/
// https://www.geeksforgeeks.org/count-trailing-zeroes-factorial-number/


/*

Trailing zeros in a number are produced by factors of 10, which are the result of multiplying pairs of 2 and 5. 
In the context of factorials, there are always more factors of 2 than factors of 5, 
so the number of trailing zeros is determined by the number of times 5 appears as a factor in the numbers from 1 to ( n ).

Time Complexity: O(log2N)

We take log2N in binary search and our check() function takes log5N time so the overall time complexity becomes log2N * log5N which in a more general sense can be written as (logN)2 which can also be written as log2N.

Auxiliary Space: O(1)
*/


/*

Brute

O(nlogn) & O(1)

*/


class Solution {
    findNum(n) {
        // code here
        if (n === 1) return 5

        let num = 1, count = 0

        while (true) { // count the number of 5 will give us no of zeros, we keep checking from 1 till we find n zeros
            let temp = num

            while (temp % 5 === 0) {
                count++ // keep adding the count
                temp = temp / 5
            }

            if (count >= n) return num

            num++
        }

    }
}


/*

Optimal - Binary Search

O(logn*logn) & O(1)

*/

// Trailing 0s in x! = Count of 5s in prime factors of x!  = floor(x/5) + floor(x/25) + floor(x/125) + .... 

const isPossible = (num, n) => {
    let count = 0, factor = 5

    while (factor <= num) {
        count += Math.floor(num / factor)
        factor *= 5
    }

    return count >= n
}


class Solution {
    findNum(n) {
        if (n === 1) return 5

        let l = 1, r = 5 * n, mid // upper bound is safe since every 5 adds a trailing zero

        while (l <= r) {
            mid = l + Math.floor((r - l) / 2)

            if (isPossible(mid, n)) { // for every num, check if that num! has n zeros
                r = mid - 1
            } else {
                l = mid + 1
            }
        }

        return l
    }
}



