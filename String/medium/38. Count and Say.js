// https://leetcode.com/problems/count-and-say/description/


/*

Recursion

O(2^n) & O(2^n) + n

*/

var countAndSay = function (n) {
    // Base case: if n is 1, the sequence is just "1"
    if (n === 1) return "1";

    // Recursively get the previous term in the sequence
    const prev = countAndSay(n - 1);

    // Initialize an empty string to build the result
    let res = "";

    // Initialize count for consecutive digits and index j
    let count, j = 0;

    // Loop through each character in the previous term
    while (j < prev.length) {
        count = 1; // Start counting from 1 for the current digit

        // Count consecutive same digits
        while (j + 1 < prev.length && prev[j] === prev[j + 1]) {
            count++;
            j++;
        }

        // Append the count and the digit to the result string
        res += count + prev[j];

        // Move to the next digit
        j++;
    }

    // Return the constructed result for this term
    return res;
};


/*

Iterative

O(2^n) & O(2^n)

*/


var countAndSay = function(n) {
    // Base case: if n is 1, the sequence is just "1"
    if (n === 1) return "1";

    // Start with the first term in the sequence
    let number = "1";

    // Iterate to build up to the nth term
    for (let i = 1; i < n; i++) {
        let count = 1; // Counter for consecutive digits
        let curr = number[0]; // Current digit being counted
        let res = ""; // String to build the next term

        // Loop through the current term starting from the second character
        for (let j = 1; j < number.length; j++) {
            if (number[j] === curr) {
                // If the digit is the same as the current, increment count
                count++;
            } else {
                // If it's a new digit, append count and digit to result
                res += count + curr;
                count = 1; // Reset count for the new digit
                curr = number[j]; // Update current digit
            }
        }

        // After the loop, append count and digit for the last group
        res += count + curr;

        // Update number to the new term for the next iteration
        number = res;
    }

    // After n-1 iterations, number holds the nth term
    return number;
};
