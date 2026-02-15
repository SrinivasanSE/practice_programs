// https://www.geeksforgeeks.org/print-sums-subsets-given-set/

/*

Iterative 
O(2^n) & O(2^n)

*/

class Solution {
  subsetSums(arr) {
    // code here
    let sums = [0];

    for (let num of arr) {
      const n = sums.length;
      for (let i = 0; i < n; i++) {
        sums.push(sums[i] + num);
      }
    }

    return sums;
  }
}

/*

Recursive
O(2^n) & O(2^n)

*/

class Solution {
  subsetSums(arr) {
    // code here
    let res = [];
    const n = arr.length;
    const findSums = (index, sum) => {
      if (index === n) {
        res.push(sum);
        return;
      }

      findSums(index + 1, sum + arr[index]);
      findSums(index + 1, sum);
    };

    findSums(0, 0);
    return res;
  }
}
