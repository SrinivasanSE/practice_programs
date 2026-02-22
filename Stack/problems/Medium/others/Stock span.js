// https://www.geeksforgeeks.org/the-stock-span-problem/

// efficient sol - For each index, we need to find the previous greater element
function calculateSpan(arr) {
  let n = arr.length;
  let span = new Array(n);
  let st = [];

  // Process each day's price
  for (let i = 0; i < n; i++) {
    // Remove elements from the stack while the current
    // price is greater than or equal to stack's top price
    while (st.length > 0 && arr[st[st.length - 1]] <= arr[i]) {
      st.pop();
    }

    // If stack is empty, all elements to the left are smaller
    // Else, top of the stack is the last greater element's index
    if (st.length === 0) {
      span[i] = i + 1;
    } else {
      span[i] = i - st[st.length - 1];
    }

    // Push the current index to the stack
    st.push(i);
  }

  return span;
}
