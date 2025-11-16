// https://leetcode.com/problems/arranging-coins/description/


/*

Better - Binary Search

O(logn) & O(1)

*/


var arrangeCoins = function(n) {
    // We search for the maximum k such that k*(k+1)/2 <= n
    // k can be anywhere from 1 to n (worst case)
    let l = 1, h = n, mid, numCoins;

    while (l <= h) {
        // Standard binary search midpoint
        mid = l + Math.floor((h - l) / 2);

        // Number of coins required to build 'mid' full rows
        numCoins = (mid * (mid + 1)) / 2;

        // If exactly matches n, mid is the answer
        if (numCoins === n) return mid;

        if (numCoins < n) {
            // We can build at least 'mid' rows, try more
            l = mid + 1;
        } else {
            // We used too many coins, try fewer rows
            h = mid - 1;
        }
    }

    // After the loop, 'h' is the largest index where numCoins <= n
    // or equivalently l - 1
    return l - 1;
};


/*

Optimal - Maths

O(1) & O(1)

*/


var arrangeCoins = function (n) {

    // We want the largest k such that:
    //     1 + 2 + ... + k = k*(k+1)/2 <= n
    //
    // Solve the quadratic equation:
    //     k*(k+1)/2 = n
    // Multiply both sides by 2:
    //     k^2 + k - 2n = 0
    //
    // Quadratic formula for ax^2 + bx + c = 0 is:
    //     x = (-b ± sqrt(b^2 - 4ac)) / (2a)
    //
    // Here: a = 1, b = 1, c = -2n
    //
    // Plug into the formula:
    //     k = (-1 ± sqrt(1 + 8n)) / 2
    //
    // We only take the positive root:
    //     k = (-1 + sqrt(1 + 8n)) / 2
    //
    // Since k must be an integer number of rows, take floor.

    return Math.floor((-1 + Math.sqrt(1 + 8 * n)) / 2);
};
