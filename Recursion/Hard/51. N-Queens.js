// https://leetcode.com/problems/n-queens/description/


var solveNQueens = function(n) {
    const ans = []
    let board = Array.from({length: n}, () => new Array(n).fill('.'));
    const left = new Array(n).fill(0)
    const upDiagonal = new Array(2*n - 1).fill(0)
    const downDiagonal = new Array(2*n - 1).fill(0)

    const solve = (col) => {
        if (col === n) {
            ans.push(board.map(arr => arr.join('')))
            return
        }

        for (let row = 0; row < n; row++) {
            if (left[row] === 0 && upDiagonal[n - 1 + col - row] === 0 && downDiagonal[row + col] === 0) {
                board[row][col] = 'Q'
                left[row] = 1
                upDiagonal[n - 1 + col - row] = 1
                downDiagonal[row + col] = 1
                solve(col + 1)
                board[row][col] = '.'
                left[row] = 0
                upDiagonal[n - 1 + col - row] = 0
                downDiagonal[row + col] = 0
            }
        }
    }
    solve(0)
    return ans
};