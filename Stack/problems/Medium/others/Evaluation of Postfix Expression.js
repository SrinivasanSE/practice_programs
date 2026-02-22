// https://www.geeksforgeeks.org/evaluation-of-postfix-expression/

class Solution {
  evaluatePostfix(arr) {
    let st = [];

    for (let token of arr) {
      // If token is a number
      if (!isNaN(token)) {
        st.push(parseInt(token));
      }

      // Otherwise, it's an operator
      else {
        let val1 = st.pop();
        let val2 = st.pop();

        if (token === "+") st.push(val2 + val1);
        else if (token === "-") st.push(val2 - val1);
        else if (token === "*") st.push(val2 * val1);
        else if (token === "/") st.push(Math.floor(val2 / val1));
        else if (token === "^") st.push(Math.pow(val2, val1));
      }
    }
    return st.pop();
  }
}
