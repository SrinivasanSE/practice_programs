// https://leetcode.com/problems/4sum-ii/description/


/*

Brute

O(N^4) & O(1)

*/

var fourSumCount = function(nums1, nums2, nums3, nums4) {
    let count = 0

    for (let i = 0; i < nums1.length; i++) {
        for (let j = 0; j < nums2.length; j++) {
            for (let k = 0; k < nums3.length; k++) {
                for (let l = 0; l < nums4.length; l++) {
                    if (nums1[i] + nums2[j] + nums3[k] + nums4[l] === 0) count++
                }
            }
        }
    }

    return count
};


/*

Better

O(N^3) & O(n)

*/

var fourSumCount = function (nums1, nums2, nums3, nums4) {
    let count = 0

    const hashmap = new Map()

    for (let num of nums4) {
        hashmap.set(num, (hashmap.get(num) || 0) + 1)
    }

    let target

    for (let i = 0; i < nums1.length; i++) {
        for (let j = 0; j < nums2.length; j++) {
            for (let k = 0; k < nums3.length; k++) {
                target = -(nums1[i] + nums2[j] + nums3[k])
                if (hashmap.get(target)) count += hashmap.get(target)
            }
        }
    }

    return count
};



/*

Optimal

O(N^2) & O(N^2)

*/

var fourSumCount = function (nums1, nums2, nums3, nums4) {
    let count = 0

    const hashmap = new Map()
    for (let n1 of nums3) {
        for (let n2 of nums4) {
            hashmap.set(n1 + n2, (hashmap.get(n1 + n2) || 0) + 1)
        }
    }
    let target

    for (let i = 0; i < nums1.length; i++) {
        for (let j = 0; j < nums2.length; j++) {
            target = -(nums1[i] + nums2[j])
            if (hashmap.get(target)) count += hashmap.get(target)
        }
    }

    return count
};