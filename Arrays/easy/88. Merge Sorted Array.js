// https://leetcode.com/problems/merge-sorted-array/description/
// https://www.geeksforgeeks.org/problems/merge-two-sorted-arrays-1587115620/1

// Two Variations

// There will be extra space at the end of the first array and add the elements at the first array itself

/*

Brute Force - Similar to merge sort
O(n + m) & O(n + m)

*/

var merge = function(nums1, m, nums2, n) {
    
    let i = 0, j = 0, k = 0
    let arr = new Array(m + n)
    while (i < m && j < n) {
        if (nums1[i] <= nums2[j]) {
            arr[k] = nums1[i]
            i++
        } else {
            arr[k] = nums2[j]
            j++
        }
        k++
    }

    while (i < m) {
        arr[k] = nums1[i]
        i++
        k++
    }

    while (j < n) {
        arr[k] = nums2[j]
        j++
        k++
    }

    for(let i = 0; i < m + n; i++) {
        nums1[i] = arr[i]
    }
};

/*

Optimal
O(m + n) & O(1)

*/

var merge = function(nums1, m, nums2, n) {
    
    let i = m - 1 // start from last
    let j = n - 1
    let k = m + n - 1

    while (j >= 0) { // we need to run till all the elements in the nums2 is processed
        if (i >= 0 && nums1[i] > nums2[j]) { // start setting the elements at the end till the elements are there in the first array
            nums1[k--] = nums1[i--]
        } else {
            nums1[k--] = nums2[j--]
        }
    }
    
};


// Modify both the arrays and they should be sorted, instead of placing all the elements in the first array, we place them in both the arrays

/*

Brute Force - Similar to merge sort
O(n + m) & O(n + m)

*/

function merge(arr1, arr2, n, m) {

    //Declare a 3rd array and 2 pointers:
    let arr3 = new Array(n + m);
    let left = 0;
    let right = 0;

    let index = 0;

    while (left < n && right < m) {
        if (arr1[left] <= arr2[right]) {
            arr3[index] = arr1[left];
            left++, index++;
        }
        else {
            arr3[index] = arr2[right];
            right++, index++;
        }
    }

    // If right pointer reaches the end:
    while (left < n) {
        arr3[index++] = arr1[left++];
    }

    // If left pointer reaches the end:
    while (right < m) {
        arr3[index++] = arr2[right++];
    }

    // Fill back the elements from arr3[]
    // to arr1[] and arr2[]:
    for (let i = 0; i < n + m; i++) {
        if (i < n) arr1[i] = arr3[i];
        else arr2[i - n] = arr3[i];
    }
}

/*

Better

O(min(n, m)) + O(nlogn) + O(mlogm) & O(1)

*/

class Solution {
    mergeArrays(a, b) {
        // code here
        const n = a.length
        const m = b.length
        
        let i = n - 1
        let j = 0
        
        while (i >= 0 && j < m) { // start from the end for the first arr and start for the second arr and move the elements so that arr1 contains all the small elements
            if (a[i] > b[j]) {
                [a[i], b[j]] = [b[j], a[i]]
                i--
                j++
            } else {
                break
            }
            
        }

        // now a contains lower part of the elements and b contains higher part of the elements, but they are not in the correct order, so we sort them
        
        a.sort((a, b) => a - b) // sort the arr
        b.sort((a, b) => a - b)
        
    }
}


/*

Optimal - Gap method
O((n+m)*log(n+m)) & O(1)

*/


// Helper function to swap elements between two arrays if they are out of order
function swapIfGreater(arr1, arr2, ind1, ind2) {
  // If the element in arr1 is greater than the element in arr2, swap them
  if (arr1[ind1] > arr2[ind2]) {
    [arr1[ind1], arr2[ind2]] = [arr2[ind2], arr1[ind1]];
  }
}

function merge(arr1, arr2, n, m) {
  // Total length of both arrays combined
  const len = n + m;

  // Initialize the first gap (like in Shell sort)
  // We take the ceiling because we might get an odd number
  // e.g., if len = 5, gap = ceil(5/2) = 3
  // This ensures we don’t round down and skip necessary comparisons.
  let gap = Math.ceil(len / 2);

  // Continue until the gap becomes 0
  while (gap > 0) {
    let left = 0;
    let right = left + gap; // right pointer is 'gap' distance away

    // Compare and swap elements 'gap' apart
    while (right < len) {
      // Case 1: both pointers are in arr1
      if (left < n && right < n) {
        swapIfGreater(arr1, arr1, left, right);
      }

      // Case 2: left pointer in arr1, right pointer in arr2
      else if (left < n && right >= n) {
        swapIfGreater(arr1, arr2, left, right - n);
      }

      // Case 3: both pointers in arr2
      else {
        swapIfGreater(arr2, arr2, left - n, right - n);
      }

      // Move both pointers one step forward
      left++;
      right++;
    }

    // When gap reduces to 1, we can break, we find the gap below, so if it's 1, it would have been already processed and 1/2 will give 0.5 and ceil is 1 again, so we break here
    if (gap == 1) break;

    // Reduce the gap for next iteration (half of the current)
    // Use ceil to ensure it doesn't become 0 prematurely
    gap = Math.ceil(gap / 2);
  }
}

