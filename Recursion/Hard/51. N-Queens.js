// https://leetcode.com/problems/n-queens/description/


const canPlace = (board, row, col, n) => {
    let tRow = row
    let tCol = col

    // upper diagonal
    while (tRow >= 0 && tCol >= 0) {
        if (board[tRow][tCol] === 'Q') return false
        tRow--
        tCol--
    }

    tCol = col
    // check same row left side
    while (tCol >= 0) {
        if (board[row][tCol] === 'Q') return false
        tCol--
    }

    tRow = row
    tCol = col
    // down diagonal
    while (tRow < n && tCol >= 0) {
        if (board[tRow][tCol] === 'Q') return false
        tRow++
        tCol--
    }

    return true

}

var solveNQueens = function(n) {
    const board = Array.from({length: n}, () => new Array(n).fill('.'))

    const res = []

    const generate = (col) => {
        if (col === n) {
            res.push(board.map(arr => arr.join('')))
            return
        }

        for (let i = 0; i < n; i++) {
            if (canPlace(board, i, col, n)) {
                board[i][col] = 'Q'
                generate(col + 1)
                board[i][col] = '.'
            }
        }
    }

    generate(0)
    return res
};


var solveNQueens = function(n) {
    const ans = []
    let board = Array.from({length: n}, () => new Array(n).fill('.'));
    const left = new Array(n).fill(0)
    const upDiagonal = new Array(2*n - 1).fill(0) // 2*n - 1
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

// why do we use row + col and n - 1 + col - row ?

/*

Downward diagonal

We use row + col for the downward ("\") diagonal because all cells on the same diagonal share this sum. This lets us quickly check for conflicts in O(1) time using an array.

Upward diagonal

The value of col - i can range from -(n-1) to n-1.
Array indices can't be negative, so we shift the range to all positive indices by adding n - 1.

For example, if n = 8, then col - i ranges from -7 to 7.
Adding n-1 = 7 shifts the range to 0 to 14.

*/