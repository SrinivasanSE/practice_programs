// https://www.geeksforgeeks.org/dsa/convert-min-heap-to-max-heap/


// O(n)

const heapify = (nums, i, n) => { // this is for maxheap, use the code for minHeap to convert max to min heap
    let largest = i

    const left = 2*i + 1
    const right = 2*i + 2

    if (left < n && nums[left] > nums[largest]) {
        largest = left
    }
    if (right < n && nums[right] > nums[largest]) {
        largest = right
    }

    if (largest != i) {
        [nums[largest], nums[i]] = [nums[i], nums[largest]]
        heapify(nums, largest, n)
    }
}


class Solution {
    minToMaxHeap(nums) {
        const n = nums.length

        for (let i = Math.floor(n/2) - 1; i >= 0; i--) { // start from last internal node
            heapify(nums, i, n)
        }

        return nums
    }
}

/*

Start from the last internal node because leaf nodes are already heaps.
Go upwards to the root, so that when you heapify a node, its children are already heaps.
This is the standard and most efficient way to build a heap from an array.

*/