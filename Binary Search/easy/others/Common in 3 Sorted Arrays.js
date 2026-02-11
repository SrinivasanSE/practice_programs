// https://www.geeksforgeeks.org/find-common-elements-three-sorted-arrays/

/*

Brute - Hashmap

O((n1 + n2 + n3)*log n1) & O(n1)

*/

var commonElements = (arr1, arr2, arr3) => {
  const hashmap = new Map();
  arr1.forEach((ele) => {
    hashmap.set(ele, 1);
  });

  arr2.forEach((ele) => {
    if (hashmap.get(ele) === 1) {
      hashmap.set(ele, 2);
    }
  });

  arr3.forEach((ele) => {
    if (hashmap.get(ele) === 2) {
      hashmap.set(ele, 3);
    }
  });
  const res = [];
  for (const key of hashmap.keys()) {
    if (hashmap.get(key) === 3) {
      res.push(key);
    }
  }

  if (res.length === 0) {
    res.push(-1);
  }

  return res;
};

/*

Optimal - Two pointers

O(n1 + n2 + n3) & O(1)

*/

var commonElements = (arr1, arr2, arr3) => {
  let i = 0,
    j = 0,
    k = 0;
  const res = [];
  const n1 = arr1.length;
  const n2 = arr2.length;
  const n3 = arr3.length;
  while (i < n1 && j < n2 && k < n3) {
    if (arr1[i] === arr2[j] && arr2[j] === arr3[k]) {
      res.push(arr1[i]);
      i++;
      j++;
      k++;

      while (i < n1 && arr1[i] === arr1[i - 1]) i++; // skip the duplicates
      while (j < n2 && arr2[j] === arr2[j - 1]) j++;
      while (k < n3 && arr3[k] === arr3[k - 1]) k++;
    } else if (arr1[i] < arr2[j]) {
      i++;
    } else if (arr2[j] < arr3[k]) {
      j++;
    } else {
      k++;
    }
  }
  return res;
};
