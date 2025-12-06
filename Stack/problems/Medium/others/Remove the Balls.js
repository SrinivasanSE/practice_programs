// https://www.geeksforgeeks.org/length-of-array-after-removing-consecutive-balls/

class Solution {
  finLength(N, color, radius) {
    let stack = [];
    for (let i = 0; i < N; i++) {
      if (
        stack.length > 0 &&
        stack[stack.length - 1][0] === color[i] &&
        stack[stack.length - 1][1] === radius[i]
      ) {
        stack.pop();
      } else {
        stack.push([color[i], radius[i]]);
      }
    }

    return stack.length;
  }
}
