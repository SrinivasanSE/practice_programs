// https://leetcode.com/problems/letter-combinations-of-a-phone-number/description/

/*

Time complexity: O(3^n) or O(4^n)
n is length of input string. Each digit has 3 or 4 letters. For example, if you get "23"(n) as input string, we will create 9 combinations which is O(3^2) = 9

Space complexity: O(4^n * n) for storage and O(n) for recursive call stack.
n is length of input string.

*/


var letterCombinations = function (digits) {

    const n = digits.length
    const res = []
    const mapping = {
        2: "abc",
        3: "def",
        4: "ghi",
        5: "jkl",
        6: "mno",
        7: "pqrs",
        8: "tuv",
        9: "wxyz"
    }
    const findCombinations = (index, curr) => {
        if (index === n) {
            res.push(curr)
            return
        }
        for (let char of mapping[digits[index]]) {
            findCombinations(index + 1, curr + char)
        }
    }
    if (digits)
        findCombinations(0, "")
    return res
};


/*

0 
1 a
2 ad
2 ae
2 af
1 b
2 bd
2 be
2 bf
1 c
2 cd
2 ce
2 cf

*/



