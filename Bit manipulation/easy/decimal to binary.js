// https://www.geeksforgeeks.org/javascript/javascript-program-to-convert-decimal-to-binary/


function decimalToBinary(N) {
    let binary = '';

    while (N > 0) {
        binary = (N % 2) + binary;
        N = Math.floor(N / 2);
    }

    return binary;
}