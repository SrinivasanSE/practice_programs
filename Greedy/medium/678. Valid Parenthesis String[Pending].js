// https://leetcode.com/problems/valid-parenthesis-string/description/

// check DP approaches

/*

Recursion
O(3^n) & O(n)

*/

var checkValidString = function (s) {
  // Start recursion from index 0 with 0 open brackets
  return isValid(s, 0, 0);
};

const isValid = (s, i, count) => {
  // If at any point we have more ')' than '(',
  // this path can never become valid
  if (count < 0) return false;

  // If we reached the end of the string,
  // it is valid only if all '(' are closed
  if (i === s.length) return count === 0;

  // If current character is '(',
  // it must increase the open bracket count
  if (s[i] === "(") {
    return isValid(s, i + 1, count + 1);
  }

  // If current character is ')',
  // it must close one '('
  if (s[i] === ")") {
    return isValid(s, i + 1, count - 1);
  }

  // If current character is '*',
  // it can act as:
  // 1) '('  → increase count
  // 2) ')'  → decrease count
  // 3) ''   → ignore it
  // If ANY of these possibilities lead to a valid string,
  // the entire string is valid
  return (
    isValid(s, i + 1, count + 1) || // '*' as '('
    isValid(s, i + 1, count - 1) || // '*' as ')'
    isValid(s, i + 1, count) // '*' as empty
  );
};

/*

Greedy
O(n) & O(1)

*/

var checkValidString = function (s) {
  let open = 0,
    closed = 0,
    prefix,
    suffix;
  const n = s.length;
  for (let i = 0; i < n; i++) {
    (prefix = s[i]), (suffix = s[n - i - 1]);
    if (prefix === "(" || prefix === "*") {
      // assuming * as (
      open++;
    } else {
      open--;
    }

    if (suffix === ")" || suffix === "*") {
      closed++;
    } else {
      closed--;
    }

    if (open < 0 || closed < 0) return false; // if it ever becomes negative, that means that there are two many open or closed brackets which could not be closed
  }

  return true;
};

/*

From LEFT → RIGHT

You should never see more ) than possible (.

From RIGHT → LEFT

You should never see more ( than possible ).

Because * is flexible, we treat it:

as '(' when scanning left → right

as ')' when scanning right → left

If both directions stay valid, then the string can be valid.

*/
