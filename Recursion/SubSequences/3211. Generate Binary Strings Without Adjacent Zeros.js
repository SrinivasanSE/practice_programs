// https://leetcode.com/problems/generate-binary-strings-without-adjacent-zeros/description/
// https://www.geeksforgeeks.org/dsa/generate-all-the-binary-strings-of-n-bits/

/*
Complexity

Time: O(n * 2^n) – there are 2^n strings, and printing each takes O(n).

Space: O(n) for the array + recursion stack depth n (output space not counted).

*/

// without consecutive 1s

const generate = (arr, n, i, ans) => {
  if (i === n) {
    ans.push([...arr].join(""))
    return
  }

  arr[i] = 0
  generate(arr, n, i + 1, ans)
  if (i === 0 || arr[i - 1] === 0) { // removing this condition will print all the substrings
    arr[i] = 1
    generate(arr, n, i + 1, ans)
  }
}

class Solution {
  // Function to generate all binary strings of n bits.
  generateBinaryStrings(n) {
    // your code here
    let ans = []
    let arr = new Array(n).fill(0)
    generate(arr, n, 0, ans)
    return ans
  }
}

// another variation

var validStrings = function (n) {
  let ans = []

  const generate = (current, prev) => {
    if (n === current.length) {
      ans.push(current)
      return
    }

    if (prev !== '0') {
      generate(current + '0', '0')
    }

    generate(current + '1', '1')
  }
  generate('', '')
  return ans
};


// Iterative

var validStrings = function (n) {
  let ans = ['0', '1']

  for (let i = 2; i <= n; i++) {
    let temp = []
    for (let str of ans) {
      let prev = str[str.length - 1]
      if (prev != '0')
        temp.push(str + '0')
      temp.push(str + '1')
    }

    ans = temp
  }

  return ans
};


/*

Generate all

arr[0]=0
  arr[1]=0
    arr[2]=0 → print 000
    arr[2]=1 → print 001
  arr[1]=1
    arr[2]=0 → print 010
    arr[2]=1 → print 011
arr[0]=1
  arr[1]=0
    arr[2]=0 → print 100
    arr[2]=1 → print 101
  arr[1]=1
    arr[2]=0 → print 110
    arr[2]=1 → print 111

Generate without consecutives 1s

arr[0] = 0
  arr[1] = 0
    arr[2] = 0  → print "000"
    arr[2] = 1  → print "001"
  arr[1] = 1
    arr[2] = 0  → print "010"
    arr[2] = 1  → blocked (arr[1] == 1) → skip
arr[0] = 1
  arr[1] = 0
    arr[2] = 0  → print "100"
    arr[2] = 1  → print "101"
  arr[1] = 1  → blocked (arr[0] == 1) → skip


*/