// https://www.geeksforgeeks.org/count-1s-sorted-binary-array/

class Solution {
    countZeroes(arr) {
        let n = arr.length
        let l = 0
        let h = n - 1
        while (l <= h) {
            const mid = l + Math.floor((h - l) / 2)
            if ((mid === 0 || arr[mid - 1] === 1) && arr[mid] === 0) {
                return n - mid
            }
            if (arr[mid] === 1) {
                l = mid + 1
            }
            else {
                h = mid - 1
            }
        }

        return 0

    }
}


class Solution {
    countOnes(arr) {
        const n = arr.length
        let l = 0, r = n - 1, mid

        while (l <= r) {
            mid = l + Math.floor((r - l) / 2)

            if (arr[mid] === 1 && (mid === r || arr[mid + 1] === 0)) {
                return mid + 1
            }

            if (arr[mid] === 1) {
                l = mid + 1
            } else {
                r = mid - 1
            }
        }

        return 0
    }
}
