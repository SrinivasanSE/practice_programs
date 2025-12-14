// https://leetcode.com/problems/fruit-into-baskets/description/

/*

Better

O(2n) & O(n)

*/

var totalFruit = function(fruits) {
    const map = new Map()
    let start = 0
    const n = fruits.length
    let len = 0, count
    for (let right = 0; right < n; right++) {
         map.set(fruits[right], (map.get(fruits[right]) || 0) + 1)
        while (map.size > 2) {
            count = map.get(fruits[start]) - 1
            map.set(fruits[start], count)
            if (count === 0) map.delete(fruits[start])
            start++
        }

        len = Math.max(len, right - start + 1)
    }

    return len
};

// O(n) & O(n)
var totalFruit = function(fruits) {
    const map = new Map()
    let start = 0
    const n = fruits.length
    let count, right
    for (right = 0; right < n; right++) {
         map.set(fruits[right], (map.get(fruits[right]) || 0) + 1)
        if (map.size > 2) { // if can be used instead of while and we move start one at a time. We don't let the window size to increase till it's valid
            count = map.get(fruits[start]) - 1
            map.set(fruits[start], count)
            if (count === 0) map.delete(fruits[start])
            start++
        }
    }

    return right - start
};


/*

Optimal

O(n) & O(1)

*/

var totalFruit = function(fruits) {
    let lastFruit = -1, secondLastFruit = -1, currCount = 0, lastFruitStreak = 0, maxLen = 0

    for (let fruit of fruits) {
        if (fruit === lastFruit || fruit === secondLastFruit) {
            currCount++
        } else {
            currCount = lastFruitStreak + 1 // lastFruitStreak allows the algorithm to remember how many times the last fruit type appeared consecutively, so when a third type appears, you start the new window with the streak of the last fruit plus the new fruit.
        }

        if (fruit === lastFruit) { // if it matches the lastfruit, increment the count, else reset the streak
            lastFruitStreak++
        } else { // we reset the streak here and drop the oldest fruit
            lastFruitStreak = 1
            secondLastFruit = lastFruit
            lastFruit = fruit
        }

        maxLen = Math.max(maxLen, currCount)

    }

    return maxLen
};