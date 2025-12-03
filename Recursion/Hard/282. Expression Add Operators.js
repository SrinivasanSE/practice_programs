// https://leetcode.com/problems/expression-add-operators/description/
// https://www.youtube.com/watch?v=tunRDBsP7OQ

// O(4^n) & O(n)

var addOperators = function(num, target) {
    
    const n = num.length
    const ans = []

    const solve = (index, exp, sum, prev) => {
        if (index === n) {
            if (sum === target) {
                ans.push(exp)
                return
            }
        }
        let currNum 
        for (let i = index; i < n; i++) {
            if (i > index && num[index] === '0') break // we can take 0 as the individual num, but we can't take like 01, so after the current index, if the num starts with 0, we ignore that path
            currNum = Number(num.slice(index, i + 1))
            if (index === 0) {
                solve(i + 1, exp + currNum, sum + currNum, currNum)
            }
            else {
            solve(i + 1, exp + '+' + currNum, sum + currNum, currNum )
            solve(i + 1, exp + '-' + currNum, sum - currNum, -currNum ) // prev should be negative
            solve(i + 1, exp + '*' + currNum, sum - prev + currNum*prev, currNum*prev) // special case for multiplication case
            // exp = 1 + 2, currNum = 3, sum = 3, prev = 2. We need to multiply 3 with 2, so we need to adjust the sum, sum - prev will give 1, currNum*prev = 3*2
            }
        }
    }
    solve(0, '', 0, 0)
    return ans
};