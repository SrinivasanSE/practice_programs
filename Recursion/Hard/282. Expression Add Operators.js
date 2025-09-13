// https://leetcode.com/problems/expression-add-operators/description/

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
            solve(i + 1, exp + '-' + currNum, sum - currNum, -currNum )
            solve(i + 1, exp + '*' + currNum, sum - prev + currNum*prev, currNum*prev) // special case for multiplication case
            }
        }
    }
    solve(0, '', 0, 0)
    return ans
};