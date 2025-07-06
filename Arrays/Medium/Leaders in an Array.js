// https://takeuforward.org/data-structure/leaders-in-an-array/

/*
Brute Force
O(n^2) & O(1)
*/


function printLeadersBruteForce(arr, n) {

  let ans = [];

  for (let i = 0; i < n; i++) {
    let leader = true;

    //Checking whether arr[i] is greater than all 
    //the elements in its right side
    for (let j = i + 1; j < n; j++)
      if (arr[j] > arr[i]) {

        // If any element found is greater than current leader
        // curr element is not the leader.
        leader = false;
        break;
      }

    // Push all the leaders in ans array.
    if (leader)
      ans.push(arr[i]);

  }

  return ans;
}


/*

Optimal
O(n) & O(n)

*/


function printLeaders(arr, n) {

  let ans = [];

  // Last element of an array is always a leader,
  // push into ans array.
  let max = arr[n - 1];
  ans.push(arr[n - 1]);

  // Start checking from the end whether a number is greater
  // than max no. from right, hence leader.
  for (let i = n - 2; i >= 0; i--) {
    if (arr[i] > max) {
      ans.push(arr[i]);
      max = arr[i];
    }
  }

  return ans;
}

