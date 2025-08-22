// https://leetcode.com/problems/merge-sorted-array/description/

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
        if (i >= 0 && nums1[i] > nums2[j]) { // start setting the elements at the end
            nums1[k--] = nums1[i--]
        } else {
            nums1[k--] = nums2[j--]
        }
    }
    
};


// Modify both the arrays and they should be sorted

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

Optimal - Gap method
O((n+m)*log(n+m)) & O(1)

*/


function swapIfGreater(arr1, arr2, ind1, ind2) {
  if (arr1[ind1] > arr2[ind2]) {
    [arr1[ind1], arr2[ind2]] = [arr2[ind2], arr1[ind1]];
  }
}

function merge(arr1, arr2, n, m) {
  const len = n + m;
  let gap = Math.ceil(len / 2);

  while (gap > 0) {
    let left = 0;
    let right = left + gap;

    while (right < len) {
      if (left < n && right >= n) {
        swapIfGreater(arr1, arr2, left, right - n);
      } else if (left >= n) {
        swapIfGreater(arr2, arr2, left - n, right - n);
      } else {
        swapIfGreater(arr1, arr1, left, right);
      }
      left++, right++;
    }

    if (gap == 1) break;

    gap = Math.ceil(gap / 2);
  }
}
