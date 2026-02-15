// https://www.geeksforgeeks.org/problems/check-if-there-exists-a-subsequence-with-sum-k/1

// dp sol could be there, check

function checkSubsequenceSum(N, arr, k) {
  function checkSum(index, sum) {
    if (sum > k) {
      return false;
    }

    if (index === N) {
      return sum === k;
    }

    return checkSum(index + 1, sum + arr[index]) || checkSum(index + 1, sum);
  }

  return checkSum(0, 0);
}
