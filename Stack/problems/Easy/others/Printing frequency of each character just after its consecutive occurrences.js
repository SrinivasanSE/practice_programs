// https://www.geeksforgeeks.org/printing-frequency-of-each-character-just-after-its-consecutive-occurrences/

/*

Without stack

O(n) & O(1)

*/

function transform(s) {
  let res = "";
  let i = 0;
  let n = s.length;

  while (i < n) {
    let c = s[i].toLowerCase(); // Convert the character to lowercase
    let count = 1;

    // Count consecutive occurrences of the same character
    while (i + 1 < n && c === s[i + 1].toLowerCase()) {
      i++;
      count++;
    }

    // Append the result as "count + character"
    res += `${count}${c}`;
    i++;
  }

  return res;
}

/*

With Stack

O(n) & O(n)

*/

function transform(s) {
  let res = "";
  let stack = [];
  let count = 1;

  // Iterate through each character of the string
  for (let char of s) {
    char = char.toLowerCase(); // Convert character to lowercase

    // If the stack is empty, add the first character
    if (stack.length === 0) {
      stack.push(char);
    } else {
      // If the current character matches the top of the stack
      if (char === stack[stack.length - 1]) {
        count++; // Increase count for consecutive characters
      } else {
        // Append the count and the character from the stack
        res += `${count}${stack.pop()}`;
        // Push the new character onto the stack and reset count to 1
        stack.push(char);
        count = 1;
      }
    }
  }

  // If there are any characters left in the stack, append them, for example: aaaa
  if (stack.length > 0) {
    res += `${count}${stack.pop()}`;
  }

  return res;
}

// Example usage:
console.log(transform("aaabbbcDD")); // Output: "3a3b2d"
