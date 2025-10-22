



var longestCommonSubsequence = function(text1, text2) {
    
    const n1 = text1.length, n2 = text2.length

    const dp = Array.from({length: n1 + 1}, () => new Array(n2 + 1).fill(0))

    for (let i1 = 1; i1 <= n1; i1++) {
        for (let i2 = 1; i2 <= n2; i2++) {
            if (text1[i1 - 1] === text2[i2 - 1] ) {
            dp[i1][i2] = 1 + dp[i1 - 1][i2 - 1]
        } else {
            dp[i1][i2] = Math.max(dp[i1 - 1][i2], dp[i1][i2 - 1])
        }

        }
    }

    let i = n1, j = n2, str = ""

    while (i > 0 && j > 0) { // we can use the same dp array and find the lcs
        if (text1[i - 1] === text2[j - 1]) {
            str = text1[i - 1] + str // form in reverse and reverse at the end
            i--
            j--
        } else if (dp[i - 1][j] > dp[i][j - 1]) { // we would have got the max value from any of this two, else condition in the above code, we find which is max and move the index towards it
            i--
        } else {
            j--
        }
    }

    console.log(str)

};