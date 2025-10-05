// https://www.geeksforgeeks.org/dsa/remove-minimum-coins-such-that-absolute-difference-between-any-two-piles-is-less-than-k/


/*

Binary Search & Prefix sum

O(nlogn) & O(n)

*/

class Solution {
    minimumCoins(arr, k) {
        // code here
        arr.sort((a, b) => a - b)
        const n = arr.length
        let prefix = new Array(n + 1).fill(0)

        for (let i = 1; i <= n; i++) { // including n
            prefix[i] = prefix[i - 1] + arr[i - 1] // find the prefix sum
        }

        let minCoins = prefix[n], j
        for (let i = 0; i < n; i++) {
            j = this.upperBound(arr, arr[i] + k) // find the first index where the diff is more than k, [1, 2, 5, 8], 5 - 1 > 3, so j will be 2
            // now to make all coins in this range [arr[i], arr[i] + k], piles less than arr[i] must be removed entirely and 
            // Piles greater than arr[i]+k must be trimmed down to arr[i]+k, [5, 8] should become [4, 4]

            // prefix[i] - sum of all piles < arr[i], we need to remove all the coins the before the ith index
            // ((prefix[n] - prefix[j]) - (n - j)*(arr[i] + k)) - From index j, all the coins are above arr[i] + k, 1 + 3 = 4 > 5, they should become [4, 4]
            // prefix[n] - prefix[j] will give the sum of j to n. which is 5 + 8 = 13
            // (n - j)*(arr[i] + k) - We should make it [4, 4], so (4 - 2) * (1 + 3) = 8. 13 - 8 = 5, we need to remove that 5 excess coins
            let coinsRemoved = prefix[i] + ((prefix[n] - prefix[j]) - (n - j) * (arr[i] + k))

            minCoins = Math.min(minCoins, coinsRemoved) // for each item in the arr, calculate min coins to remove
        }
        return minCoins

    }

    upperBound(arr, target) {
        let l = 0
        let r = arr.length - 1

        while (l <= r) {
            const mid = l + Math.floor((r - l) / 2)

            if (arr[mid] <= target) {
                l = mid + 1
            } else {
                r = mid - 1
            }
        }
        return l
    }
}

/*

Two pointers

O(nlogn) & O(1)

*/

class Solution {
    minimumCoins(arr, k) {
        // code here
        arr.sort((a, b) => a - b)
        const n = arr.length
        let prefix = 0
        const total = arr.reduce((accum, curr) => accum + curr, 0)
        let minCoins = total, end = 0, windowSum = 0
        for (let start = 0; start < n; start++) {
            while (end < n && arr[end] - arr[start] <= k) {
                windowSum += arr[end]
                end++
            }

            let removed = prefix + ((total - prefix - windowSum) - (n - end) * (arr[start] + k)) // prefix - contains the sum before start, windowSum contains sum btw [start, end] 
            minCoins = Math.min(minCoins, removed)

            if (start === end) { // if there is no window, move the end to prevent infinite loop
                end++
            } else {
                windowSum -= arr[start]
            }

            prefix += arr[start]

        }
        return minCoins
    }

}

