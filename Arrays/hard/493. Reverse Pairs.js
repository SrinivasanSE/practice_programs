// https://leetcode.com/problems/reverse-pairs/description/


/*
Brute - loops
O(n^2) & O(1)
*/

var reversePairs = function (nums) {
    let cnt = 0
    const n = nums.length
    for (let i = 0; i < n; i++) {
        for (let j = i + 1; j < n; j++) {
            if (nums[i] > 2 * nums[j]) {
                cnt++
            }
        }
    }

    return cnt
};

/*
Optimal - merge sort
O(nlogn) & O(1)
*/

const merge = (arr, low, mid, high) => {
    let left = low
    let right = mid + 1
    const temp = new Array(high - low)
    let k = 0
    while (left <= mid && right <= high) {
        if (arr[left] <= arr[right]) {
            temp[k] = arr[left++]
        } else {
            temp[k] = arr[right++]
        }
        k++
    }

    while (left <= mid) {
        temp[k++] = arr[left++]
    }

    while (right <= high) {
        temp[k++] = arr[right++]
    }

    for (let i = low; i <= high; i++) {
        arr[i] = temp[i - low]
    }
}

const countPairs = (arr, low, mid, high) => {
    let right = mid + 1
    let cnt = 0
    for (let i = low; i <= mid; i++) {
        while (right <= high && arr[i] > 2 * arr[right]) right++
        cnt += (right - (mid + 1))
    }

    return cnt
}

const mergeSort = (arr, low, high) => {
    let cnt = 0
    if (low >= high) return cnt
    const mid = low + Math.floor((high - low) / 2)
    cnt += mergeSort(arr, low, mid)
    cnt += mergeSort(arr, mid + 1, high)
    cnt += countPairs(arr, low, mid, high)
    merge(arr, low, mid, high)
    return cnt
}

var reversePairs = function (nums) {
    return mergeSort(nums, 0, nums.length - 1)

};