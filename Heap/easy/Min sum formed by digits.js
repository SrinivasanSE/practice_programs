// https://www.geeksforgeeks.org/minimum-sum-two-numbers-formed-digits-array/


// Import the heap module (not needed in JavaScript)
function minSum(arr) {
    
    // Convert the array into a min-heap
    arr.sort((a, b) => a - b);
    let num1 = [];
    let num2 = [];

    while (arr.length > 0) {
        num1.push(arr.shift()); // Pop the smallest element
        if (arr.length > 0) {
            num2.push(arr.shift()); // Pop the next smallest element
        }
    }

    return parseInt(num1.join('')) + parseInt(num2.join(''));
}

const arr = [5, 3, 0, 7, 4];
console.log(minSum(arr));