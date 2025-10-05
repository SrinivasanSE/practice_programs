// https://leetcode.com/problems/candy/description/

/*

Brute force - Using two arrays
O(3n) & O(2n)

*/


var candy = function (ratings) {
    const n = ratings.length
    let count = 0
    const left = new Array(n).fill(1)
    const right = new Array(n).fill(1)

    for (let i = 1; i < n; i++) {
        if (ratings[i - 1] < ratings[i] ) { // check right 1 < 2
            left[i] = left[i - 1] + 1
        }
    }

    for (let i = n - 2; i >= 0; i--) {
        if (ratings[i] > ratings[i + 1]) { // checking left, 1 > 0
            right[i] = right[i + 1] + 1
        }
    }

    for (let i = 0; i < n; i++) {
        count += Math.max(left[i], right[i])
    }

    return count
};

/*

Better - One array
O(2n) & O(n)

*/


var candy = function (ratings) {
    const n = ratings.length
    let count = 0
    const candies = new Array(n).fill(1)

    for (let i = 1; i < n; i++) {
        if (ratings[i] > ratings[i - 1]) {
            candies[i] = candies[i - 1] + 1
        }
    }
    count = candies[n - 1]
    for (let i = n - 2; i >= 0; i--) {
        if (ratings[i] > ratings[i + 1]) {
            candies[i] = Math.max(candies[i], candies[i + 1] + 1) // we should take max, if it already has a higher value based on the left neighbour, we should not change that
        }

        count += candies[i]
    }

    return count
};

/*

Optimal - Slope method
O(n) & O(1)

*/


var candy = function (ratings) {
    let n = ratings.length;

    // Initially give 1 candy to each child
    let candies = n;

    // Start from second child
    let i = 1;

    while (i < n) {

        // Skip equal ratings
        if (ratings[i] === ratings[i - 1]) {
            i++;
            continue;
        }

        // Initialize increasing slope counter
        let peak = 0;

        // Traverse strictly increasing ratings
        while (i < n && ratings[i] > ratings[i - 1]) {
            peak++;
            candies += peak;
            i++;
        }

        // Initialize decreasing slope counter
        let valley = 0;

        // Traverse strictly decreasing ratings
        while (i < n && ratings[i] < ratings[i - 1]) {
            valley++;
            candies += valley;
            i++;
        }

        // Remove overlapping candy at the peak
        candies -= Math.min(peak, valley); // reason mentioned below
    }

    // Return total candies required
    return candies;
};


/*

Why Subtract min(peak, valley) Works

Think about how tall the mountain is:

If the up slope is shorter → its last element (the top) is covered by the longer down slope.

If the down slope is shorter → its top is already covered by the longer up slope.

So we remove the smaller slope’s contribution to the peak — that’s exactly min(peak, valley)

*/