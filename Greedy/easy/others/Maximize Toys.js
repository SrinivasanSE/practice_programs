// https://www.geeksforgeeks.org/maximise-the-number-of-toys-that-can-be-purchased-with-amount-k/

class Solution {
  toyCount(arr, N, K) {
    // your code here
    arr.sort((a, b) => a - b);

    let c = 0;

    for (let i = 0; i < N; i++) {
      if (arr[i] <= K) {
        c++;
        K -= arr[i];
      } else {
        break;
      }
    }

    return c;
  }
}
