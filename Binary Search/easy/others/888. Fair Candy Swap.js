// https://leetcode.com/problems/fair-candy-swap/description/


/*

Equation explanation

If Alice swaps candy x, she expects some specific quantity of candy y back.
Let SumA and SumB be the sum of candies of Alice and Bob, if Alice gives x candies then she gets y candies back from Bob and Bob gets x candies and gives y candies back.
From the above statement we can write this equation,
SumA - x + y = SumB - y + x
Finally we can arrive at this,
y = x + (SumB - SumA)/2

*/


/*

Better

O(AlogA+BlogB+AlogB) & O(1)

*/


var fairCandySwap = function (aliceSizes, bobSizes) {

    // Sort both arrays since binary search requires sorted input
    aliceSizes.sort((a, b) => a - b);
    bobSizes.sort((a, b) => a - b);

    // Compute total number of candies for Alice & Bob
    const sumA = aliceSizes.reduce((acc, curr) => acc + curr, 0);
    const sumB = bobSizes.reduce((acc, curr) => acc + curr, 0);

    // Difference / 2 gives the amount Bob must give Alice
    // so that both have same total after swapping
    let target = (sumB - sumA) / 2;

    let y, idx;
    for (let size of aliceSizes) {
        // Bob should give candy y so that: size + target = y
        y = target + size;

        // Search for y in Bob's sorted list
        idx = binarySearch(bobSizes, y);

        // If found, this is the correct swap
        if (idx >= 0) return [size, bobSizes[idx]];
    }
};

/*

Optimal

O(A + B) & O(B)

*/


var fairCandySwap = function (aliceSizes, bobSizes) {

    // Compute total candies for Alice & Bob
    const sumA = aliceSizes.reduce((acc, curr) => acc + curr, 0);
    const sumB = bobSizes.reduce((acc, curr) => acc + curr, 0);

    // Target difference Bob needs to provide
    let target = (sumB - sumA) / 2;

    // Store Bob’s candies for instant lookup
    let set = new Set(bobSizes);

    for (let size of aliceSizes) {
        // Bob must give y so that size + target = y
        let y = size + target;

        // HashSet lookup → O(1)
        if (set.has(y)) return [size, y];
    }

    return [];
};

