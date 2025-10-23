// https://leetcode.com/problems/edit-distance/description/

/*

Recursion

O(3^max(m,n)) & O(n1 + n2)

*/

var minDistance = function(word1, word2) {
    const n1 = word1.length, n2 = word2.length


    // 🔹 Recursive function with memoization
    const findOperationsCount = (i, j) => {

        // 🧩 Base cases:
        // If word1 is empty, we must insert all j chars of word2
        if (i === 0) return j

        // If word2 is empty, we must delete all i chars of word1
        if (j === 0) return i



        // ✅ Case 1: Characters match
        // No operation needed — move diagonally (i-1, j-1)
        if (word1[i - 1] === word2[j - 1]) {
            return dp[i][j] = findOperationsCount(i - 1, j - 1)
        }


        // ⚙️ Case 2: Characters don't match
        // We consider all 3 possible operations and pick the minimum:

        // 1️⃣ Insert: we add word2[j-1] → move (i, j-1)
        const insertOps = 1 + findOperationsCount(i, j - 1)

        // 2️⃣ Delete: we remove word1[i-1] → move (i-1, j)
        const deleteOps = 1 + findOperationsCount(i - 1, j)

        // 3️⃣ Replace: replace word1[i-1] with word2[j-1] → move (i-1, j-1)
        const replaceOps = 1 + findOperationsCount(i - 1, j - 1)


        // 🧮 return the minimum among all three operations
        return Math.min(insertOps, deleteOps, replaceOps)
    }


    // 🚀 Start recursion from full lengths of both strings
    return findOperationsCount(n1, n2)
}; 


/*

Memo

O(n1*n2) & O(n1 + n2) + O(n1*n2)

*/


var minDistance = function(word1, word2) {
    const n1 = word1.length, n2 = word2.length

    // 🔹 Create a 2D DP array initialized with -1
    // dp[i][j] will store the minimum operations required 
    // to convert the first i chars of word1 → first j chars of word2
    const dp = Array.from({length: n1 + 1}, () => new Array(n2 + 1).fill(-1))


    // 🔹 Recursive function with memoization
    const findOperationsCount = (i, j) => {

        // 🧩 Base cases:
        // If word1 is empty, we must insert all j chars of word2
        if (i === 0) return j

        // If word2 is empty, we must delete all i chars of word1
        if (j === 0) return i


        // 🧠 If already computed, return the stored value
        if (dp[i][j] != -1) return dp[i][j]


        // ✅ Case 1: Characters match
        // No operation needed — move diagonally (i-1, j-1)
        if (word1[i - 1] === word2[j - 1]) {
            return dp[i][j] = findOperationsCount(i - 1, j - 1)
        }


        // ⚙️ Case 2: Characters don't match
        // We consider all 3 possible operations and pick the minimum:

        // 1️⃣ Insert: we add word2[j-1] → move (i, j-1)
        const insertOps = 1 + findOperationsCount(i, j - 1)

        // 2️⃣ Delete: we remove word1[i-1] → move (i-1, j)
        const deleteOps = 1 + findOperationsCount(i - 1, j)

        // 3️⃣ Replace: replace word1[i-1] with word2[j-1] → move (i-1, j-1)
        const replaceOps = 1 + findOperationsCount(i - 1, j - 1)


        // 🧮 Store and return the minimum among all three operations
        return dp[i][j] = Math.min(insertOps, deleteOps, replaceOps)
    }


    // 🚀 Start recursion from full lengths of both strings
    return findOperationsCount(n1, n2)
}; 


/*

Tabulation

O(n1*n2) & O(n1 + n2)

*/

var minDistance = function (word1, word2) {
    const n1 = word1.length, n2 = word2.length

    // Create a 2D DP array of size (n1+1) x (n2+1)
    // dp[i][j] → min edits to convert word1[0..i-1] → word2[0..j-1]
    const dp = Array.from({ length: n1 + 1 }, () => new Array(n2 + 1).fill(0))

    // Base case 1: converting empty word1 → prefix of word2
    // Needs j insertions
    for (let j = 1; j <= n2; j++) {
        dp[0][j] = j
    }

    // Base case 2: converting prefix of word1 → empty word2
    // Needs i deletions
    for (let i = 1; i <= n1; i++) {
        dp[i][0] = i
    }

    // Fill the DP table bottom-up
    for (let i = 1; i <= n1; i++) {
        for (let j = 1; j <= n2; j++) {

            // Case 1: characters match → no new operation needed
            if (word1[i - 1] === word2[j - 1]) {
                dp[i][j] = dp[i - 1][j - 1]
            } else {
                // Case 2: characters differ → try all operations
                const insertOps = 1 + dp[i][j - 1]      // insert into word1
                const deleteOps = 1 + dp[i - 1][j]      // delete from word1
                const replaceOps = 1 + dp[i - 1][j - 1] // replace character

                // Take the minimum cost
                dp[i][j] = Math.min(insertOps, deleteOps, replaceOps)
            }
        }
    }

    // The answer → min edits to convert full word1 → word2
    return dp[n1][n2]
};


/*

Space ops - 1

O(n1*n2) * O(n2) + O(n2)

*/

var minDistance = function (word1, word2) {
    const n1 = word1.length, n2 = word2.length

    // dp → previous row, curr → current row
    let dp = new Array(n2 + 1).fill(0)
    let curr = new Array(n2 + 1).fill(0)

    // Base case: converting empty word1 → word2, insertions needed, s1 = e, s2 = re, when s1 becomes empty, insertion needed
    for (let j = 1; j <= n2; j++) {
        dp[j] = j
    }

    // Iterate through each character of word1
    for (let i = 1; i <= n1; i++) {
        // Base case: converting prefix of word1 → empty word2, deletions needed, s1 = horse, s2 = rse, we need to delete ho chars
        curr[0] = i

        for (let j = 1; j <= n2; j++) {
            if (word1[i - 1] === word2[j - 1]) {
                curr[j] = dp[j - 1]
            } else {
                const insertOps = 1 + curr[j - 1] // current row, previous column
                const deleteOps = 1 + dp[j]       // previous row, same column
                const replaceOps = 1 + dp[j - 1]  // previous row, previous column

                curr[j] = Math.min(insertOps, deleteOps, replaceOps)
            }
        }

        // Move current row to previous for next iteration
        dp = [...curr]
    }

    // Final answer is in dp[n2]
    return dp[n2]
};


/*

Space ops - 1

O(n1*n2) * O(n2)

*/

var minDistance = function (word1, word2) {
    const n1 = word1.length, n2 = word2.length

    // dp[j] → min operations to convert prefix of word1 (up to current i) → word2[0..j]
    let dp = new Array(n2 + 1).fill(0)

    // Base case: converting empty word1 → word2
    for (let j = 1; j <= n2; j++) {
        dp[j] = j
    }

    let prev, temp
    for (let i = 1; i <= n1; i++) {
        // dp[0] represents converting word1[0..i] → empty string (i deletions)
        prev = dp[0]
        dp[0] = i

        for (let j = 1; j <= n2; j++) {
            // Temporarily store current dp[j] before overwriting
            temp = dp[j]

            if (word1[i - 1] === word2[j - 1]) {
                dp[j] = prev  // match → take diagonal value
            } else {
                const insertOps = 1 + dp[j - 1] // left cell (same row)
                const deleteOps = 1 + dp[j]     // current dp[j] (old row)
                const replaceOps = 1 + prev     // diagonal cell

                dp[j] = Math.min(insertOps, deleteOps, replaceOps)
            }

            // Move diagonal pointer forward for next column
            prev = temp
        }
    }

    // Final result after processing full word1 and word2
    return dp[n2]
};
