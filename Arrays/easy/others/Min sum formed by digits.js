// https://www.geeksforgeeks.org/minimum-sum-two-numbers-formed-digits-array/


// Function to add two strings and return the result
function addString(s1, s2) {
    let i = s1.length - 1;
    let j = s2.length - 1;

    // initial carry is zero
    let carry = 0;

    // we will calculate and store the
    // resultant sum in reverse order in res
    let res = [];
    while (i >= 0 || j >= 0 || carry > 0) {
        let total = carry;
        if (i >= 0) total += parseInt(s1[i]);
        if (j >= 0) total += parseInt(s2[j]);
        res.push(total % 10);
        carry = Math.floor(total / 10);
        i--;
        j--;
    }

    // remove leading zeroes which are currently
    // at the back due to reversed string res
    while (res.length > 0 && res[res.length - 1] === 0) {
        res.pop();
    }

    // reverse our final string
    return res.reverse().join('') || "0";
}

// Function to find minimum sum using count array approach
function minSum(arr) {
    
    // Count array to store frequency of each digit
    let count = new Array(10).fill(0);

    // Count occurrences of each digit
    for (let num of arr) {
        count[num]++;
    }

    // Two strings for storing the two minimum numbers
    let s1 = [];
    let s2 = [];

    // Flag to alternate between s1 and s2
    let firstNum = true;

    // Traverse count array from 0 to 9
    for (let digit = 0; digit < 10; digit++) {
        while (count[digit]-- > 0) {
            if (firstNum) {
                if (!(s1.length === 0 && digit === 0))
                    s1.push(digit);
                firstNum = false;
            } else {
                if (!(s2.length === 0 && digit === 0))
                    s2.push(digit);
                firstNum = true;
            }
        }
    }

    // Handle case where s1 or s2 might be empty
    if (s1.length === 0) s1.push(0);
    if (s2.length === 0) s2.push(0);

    return addString(s1.join(''), s2.join(''));
}

// Driver Code
let arr = [6, 8, 4, 5, 2, 3, 0];
console.log(minSum(arr));
