// https://leetcode.com/problems/palindrome-partitioning/description/


/*

Time Complexity (TC)

Exponential:
The number of possible partitions grows exponentially with the length of the string.

For a string of length n, there are up to 2^(n-1) ways to partition it (each position between characters can be a cut or not).
For each partition, we check if substrings are palindromes (each check is O(k), where k is substring length).


Overall:
O(n * 2^n)

Space Complexity (SC)

Recursive stack: Up to O(n) for recursion.
Result storage: In the worst case, O(n * 2^n) for storing all partitions.

*/


var partition = function(s) {
    const res = []
    const n = s.length
    const find = (index, path) => {
        if (index === n) {
            res.push([...path])
            return
        }

        for (let i = index; i < n; i++) {
            if (isPalindrome(s, index, i)) {
                path.push(s.slice(index, i + 1))
                find(i + 1, path)
                path.pop()
            }
        }
    }

    find(0, [])
    return res
};

const isPalindrome = (str, i, j) => {
    while (i < j) {
        if (str[i] != str[j]) {
            return false
        }
        i++
        j--
    }

    return true
}